# PRD — API Backend (Cloudflare Worker) para Rental Car

**Estado:** Draft v1
**Autor:** Equipo Mobile
**Audiencia:** Equipo Backend
**Fecha:** 2026-06-01
**Alcance de esta versión:** Listados de vehículos + Reservas (bookings). El resto (auth completo, pagos, perfil, soporte) queda fuera de scope.

---

## 1. Contexto

`rental-car` es una app React Native (Expo Router) de alquiler de autos. Hoy toda la data está **mockeada en el cliente**:

- `services/vehiculos.js` genera 10.000 vehículos en memoria y simula latencia con `setTimeout`. Expone `getVehiculos()` y `getVehiculoById(id)`.
- La pantalla de reservas (`app/(tabs)/bookings.js`) usa un array hardcodeado `BOOKINGS`.
- El filtrado por categoría y la búsqueda por marca/modelo se hacen **client-side** sobre los 10.000 registros.

Necesitamos un backend real que sirva estos datos. La decisión técnica es levantar una **API en un Cloudflare Worker** que dé soporte a la app móvil.

### Objetivo

Exponer una API HTTP/JSON, pública en internet, de baja latencia, que permita:

1. Listar y filtrar vehículos (con paginación, búsqueda y filtros).
2. Obtener el detalle de un vehículo.
3. Crear, listar, obtener y cancelar reservas de vehículos.

### Fuera de alcance (por ahora)

- Autenticación / registro de usuarios completo (ver sección 8, manejamos un placeholder).
- Procesamiento de pagos.
- Panel de administración / carga de flota.
- Notificaciones push.
- Soporte / chat.

---

## 2. Modelos de datos

Estos modelos derivan de la estructura que la app ya consume. **Respetar nombres de campos** para minimizar cambios en el cliente.

### 2.1 Vehículo (`vehicle`)

Estructura actual que el cliente espera (de `services/vehiculos.js` y `app/vehiculo/[id].js`):

```json
{
  "id": 1,
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2024,
  "color": "rojo",
  "categoria": "Sedan",
  "precio": 1150,
  "imagen": "https://media.toyota.com.ar/....png",
  "location": "Buenos Aires, Argentina",
  "latitude": -34.6037,
  "longitude": -58.3816,
  "casa_rental": "Budgets Cars"
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `id` | integer | PK. El cliente lo castea con `Number(id)`. |
| `marca` | string | Toyota, Ford, Peugeot, Fiat (catálogo abierto). |
| `modelo` | string | |
| `anio` | integer | |
| `color` | string | rojo, azul, blanco, negro, gris. |
| `categoria` | string (enum) | `Luxury` \| `SUV` \| `Sedan` \| `Electric` \| `Sports`. |
| `precio` | number | Precio por día, en USD (entero o decimal). |
| `imagen` | string (URL) | URL absoluta. |
| `location` | string | Nombre legible de la ubicación. |
| `latitude` | number | Para el mapa de detalle. |
| `longitude` | number | Para el mapa de detalle. |
| `casa_rental` | string | Nombre de la casa de alquiler (se muestra como título del marker). |

> **Nota:** Los specs del detalle (velocidad máx, 0-100, autonomía, potencia) hoy están hardcodeados en el cliente. **No son requeridos** en esta versión, pero si el backend puede devolver un objeto `specs` opcional, lo integramos en una iteración siguiente. Documentar como nice-to-have.

### 2.2 Reserva (`booking`)

La pantalla actual muestra: vehículo, rango de fechas, ubicación, estado y precio. Proponemos un modelo normalizado (el formato "display" como `"Jun 12 - Jun 16"` lo arma el cliente):

```json
{
  "id": "bkg_a1b2c3",
  "vehicle_id": 1,
  "vehicle_label": "Toyota Corolla",
  "start_date": "2026-06-12",
  "end_date": "2026-06-16",
  "location": "Buenos Aires, Argentina",
  "status": "confirmed",
  "price_per_day": 1150,
  "total_price": 4600,
  "currency": "USD",
  "created_at": "2026-06-01T18:00:00Z"
}
```

| Campo | Tipo | Notas |
|---|---|---|
| `id` | string | PK. Prefijo `bkg_`. |
| `vehicle_id` | integer | FK a vehículo. |
| `vehicle_label` | string | Denormalizado (`"{marca} {modelo}"`) para render rápido en la lista. |
| `start_date` | string (ISO date `YYYY-MM-DD`) | |
| `end_date` | string (ISO date `YYYY-MM-DD`) | Debe ser `>= start_date`. |
| `location` | string | Heredado del vehículo al momento de reservar. |
| `status` | string (enum) | `pending` \| `confirmed` \| `completed` \| `cancelled`. |
| `price_per_day` | number | Snapshot del precio al momento de reservar. |
| `total_price` | number | `price_per_day * cantidad_de_días`. |
| `currency` | string | `USD`. |
| `created_at` | string (ISO datetime) | |

> El cliente hoy renderiza estados con mayúscula (`Confirmed`). Estandarizamos a **lowercase** en la API; el cliente formatea para display.

---

## 3. Endpoints

Base URL (sugerida): `https://rental-car-api.<account>.workers.dev` (o dominio custom vía Cloudflare).
Prefijo de versión: **`/api/v1`**.
Formato: JSON. `Content-Type: application/json`.

### 3.1 Listado de vehículos

```
GET /api/v1/vehicles
```

**Query params:**

| Param | Tipo | Default | Descripción |
|---|---|---|---|
| `q` | string | — | Búsqueda full-text sobre `marca` + `modelo` (case-insensitive, match parcial). Replica `SearchBar`. |
| `categoria` | string | — | Filtra por categoría exacta. Replica `Filters`. |
| `location` | string | — | (Opcional) Filtra por ubicación. |
| `page` | integer | 1 | Página (1-indexed). |
| `page_size` | integer | 20 | Tamaño de página. Máx 100. |
| `sort` | string | `id` | `id` \| `precio` \| `-precio` (prefijo `-` = desc). |

**Respuesta 200:**

```json
{
  "data": [ { /* vehicle */ } ],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 10000,
    "total_pages": 500
  }
}
```

> **Importante:** Hoy el cliente trae los 10.000 registros de una y filtra en memoria. Con backend real **debemos paginar y filtrar server-side**. El cliente se adaptará a este contrato (ver sección 7, impacto en mobile).

### 3.2 Detalle de vehículo

```
GET /api/v1/vehicles/{id}
```

**Respuesta 200:** objeto `vehicle`.
**Respuesta 404:** vehículo no encontrado.

```json
{ "error": { "code": "not_found", "message": "Vehicle not found" } }
```

### 3.3 Listado de reservas

```
GET /api/v1/bookings
```

**Query params:**

| Param | Tipo | Default | Descripción |
|---|---|---|---|
| `status` | string | — | Filtra por estado (`pending`, `confirmed`, etc.). |
| `page` | integer | 1 | |
| `page_size` | integer | 20 | |

**Respuesta 200:** mismo envelope `{ data, pagination }` con objetos `booking`.

> En esta versión las reservas se scopean por el `userId` placeholder (ver sección 8). Más adelante se atan al usuario autenticado.

### 3.4 Crear reserva

```
POST /api/v1/bookings
```

**Body:**

```json
{
  "vehicle_id": 1,
  "start_date": "2026-06-12",
  "end_date": "2026-06-16"
}
```

**Lógica del servidor:**

1. Validar que `vehicle_id` existe (404 si no).
2. Validar `start_date <= end_date` y que `start_date >= hoy` (422 si no).
3. Calcular `total_price = price_per_day * (días entre fechas)`.
4. Denormalizar `vehicle_label`, `location`, `price_per_day` desde el vehículo.
5. Estado inicial: `pending` (o `confirmed`, a definir con negocio — sugerimos `confirmed` para mantener el flujo simple del MVP).
6. (Opcional/nice-to-have) Validar que el vehículo no tenga otra reserva solapada en ese rango.

**Respuesta 201:** objeto `booking` creado.
**Respuesta 422:** error de validación.

```json
{
  "error": {
    "code": "validation_error",
    "message": "end_date must be on or after start_date",
    "fields": { "end_date": "must be >= start_date" }
  }
}
```

### 3.5 Obtener una reserva

```
GET /api/v1/bookings/{id}
```

**Respuesta 200:** objeto `booking`. **404** si no existe.

### 3.6 Cancelar reserva

```
PATCH /api/v1/bookings/{id}
```

**Body:**

```json
{ "status": "cancelled" }
```

En esta versión solo se permite la transición a `cancelled`. Otras transiciones de estado son responsabilidad del backend/negocio.

**Respuesta 200:** objeto `booking` actualizado.
**Respuesta 409:** si la reserva ya está `completed` o `cancelled` (no se puede cancelar).

---

## 4. Convenciones transversales

### 4.1 Formato de errores

Todos los errores siguen el mismo envelope:

```json
{
  "error": {
    "code": "string_machine_readable",
    "message": "Human readable message",
    "fields": { "campo": "detalle" }
  }
}
```

Códigos HTTP usados: `200`, `201`, `400`, `404`, `409`, `422`, `429`, `500`.

### 4.2 CORS

La app corre en iOS, Android y **web** (`expo start --web`). El Worker debe responder con headers CORS apropiados:

- `Access-Control-Allow-Origin`: configurable (en dev `*`, en prod lista blanca).
- `Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS`.
- `Access-Control-Allow-Headers: Content-Type, Authorization`.
- Manejar preflight `OPTIONS`.

### 4.3 Paginación

Envelope estándar `{ data, pagination }` descrito en 3.1. Aplica a todos los listados.

### 4.4 Rate limiting

Aplicar rate limiting básico por IP (sugerido: usar el rate limiting nativo de Cloudflare). Responder `429` con header `Retry-After`.

---

## 5. Stack técnico sugerido (Cloudflare)

No es prescriptivo, pero recomendamos:

- **Runtime:** Cloudflare Workers.
- **Router/Framework:** [Hono](https://hono.dev) (liviano, primera clase en Workers) o `itty-router`.
- **Persistencia:**
  - **Cloudflare D1** (SQLite) para vehículos y reservas → permite filtros, búsqueda (`LIKE`) y paginación con SQL real. **Recomendado.**
  - Alternativa: **KV** solo si la data es de lectura masiva y los filtros son simples (menos flexible para queries).
- **Seed de datos:** migración inicial que cargue la flota. Podemos proveer un script que genere registros equivalentes a los 10.000 mockeados (mismo patrón de `crearVehiculo`) o un set más acotado/realista para el MVP.
- **Tooling:** Wrangler para deploy y migraciones. Entornos `dev` / `production`.
- **Validación:** `zod` para validar bodies y query params.

### Esquema D1 sugerido

```sql
CREATE TABLE vehicles (
  id          INTEGER PRIMARY KEY,
  marca       TEXT NOT NULL,
  modelo      TEXT NOT NULL,
  anio        INTEGER NOT NULL,
  color       TEXT NOT NULL,
  categoria   TEXT NOT NULL,
  precio      REAL NOT NULL,
  imagen      TEXT NOT NULL,
  location    TEXT NOT NULL,
  latitude    REAL NOT NULL,
  longitude   REAL NOT NULL,
  casa_rental TEXT NOT NULL
);
CREATE INDEX idx_vehicles_categoria ON vehicles(categoria);
CREATE INDEX idx_vehicles_marca_modelo ON vehicles(marca, modelo);

CREATE TABLE bookings (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL,
  vehicle_id    INTEGER NOT NULL REFERENCES vehicles(id),
  vehicle_label TEXT NOT NULL,
  start_date    TEXT NOT NULL,
  end_date      TEXT NOT NULL,
  location      TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'confirmed',
  price_per_day REAL NOT NULL,
  total_price   REAL NOT NULL,
  currency      TEXT NOT NULL DEFAULT 'USD',
  created_at    TEXT NOT NULL
);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

---

## 6. Requisitos no funcionales

| Requisito | Objetivo |
|---|---|
| Latencia | p95 < 200 ms para listados paginados (excluyendo cold start). |
| Disponibilidad | Aprovechar la red global de Cloudflare; sin estado en memoria entre requests. |
| Escalabilidad | Soportar el catálogo completo (≥10.000 vehículos) con paginación eficiente. |
| Observabilidad | Logs estructurados + `wrangler tail`. Idealmente métricas básicas (requests, errores, latencia). |
| Seguridad | CORS con lista blanca en prod, rate limiting, validación estricta de input, sin secretos en el repo (usar `wrangler secret`). |
| Versionado | Prefijo `/api/v1` para permitir evolución sin romper clientes. |

---

## 7. Impacto en el cliente (mobile) — para alinear expectativas

El equipo mobile adaptará `services/vehiculos.js` (y la pantalla de bookings) para consumir la API. Cambios esperados:

- `getVehiculos()` → fetch a `GET /api/v1/vehicles` con paginación. La búsqueda (`q`) y el filtro (`categoria`), hoy client-side, pasarán a ser params del request.
- `getVehiculoById(id)` → `GET /api/v1/vehicles/{id}`.
- `bookings.js` → reemplazar el array `BOOKINGS` por `GET /api/v1/bookings`.
- Botón "Reservar Ahora" (`app/vehiculo/[id].js`) → `POST /api/v1/bookings`.

**Pedido al backend:** mantener los **nombres de campos del vehículo en español** (`marca`, `modelo`, `precio`, etc.) tal como están hoy, para reducir el costo del cambio. Para reservas adoptamos el modelo nuevo de la sección 2.2.

---

## 8. Autenticación (placeholder para esta versión)

No implementamos login completo todavía. Para poder scopear reservas por usuario sin bloquear el MVP:

- El cliente enviará un header `X-User-Id` con un identificador de dispositivo/usuario provisorio (o un `Authorization: Bearer <token>` simple si el backend prefiere).
- El backend usa ese valor como `user_id` para crear y listar reservas.
- **A futuro:** reemplazar por auth real (JWT / sesión). El contrato de endpoints no debería cambiar, solo el origen del `user_id`.

> A definir con backend: si prefieren no manejar usuarios aún, las reservas pueden ser globales en el MVP y agregamos el scoping en la siguiente iteración. Marcar decisión.

---

## 9. Criterios de aceptación

- [ ] `GET /api/v1/vehicles` devuelve data paginada y soporta `q`, `categoria`, `page`, `page_size`, `sort`.
- [ ] `GET /api/v1/vehicles/{id}` devuelve el vehículo o 404.
- [ ] `POST /api/v1/bookings` valida fechas y vehículo, calcula `total_price` y crea la reserva.
- [ ] `GET /api/v1/bookings` lista reservas (scopeadas por `user_id` si aplica).
- [ ] `GET /api/v1/bookings/{id}` y `PATCH .../bookings/{id}` (cancelación) funcionan según contrato.
- [ ] CORS habilitado para iOS/Android/web.
- [ ] Errores siguen el envelope estándar con códigos HTTP correctos.
- [ ] Deploy reproducible vía Wrangler con entorno `dev` y `production`.
- [ ] Seed inicial de la flota cargado en D1.
- [ ] Documentación de la API (este contrato) verificada contra la implementación.

---

## 10. Preguntas abiertas / decisiones a tomar con backend

1. **Estado inicial de la reserva:** ¿`pending` o `confirmed` en el MVP?
2. **Scoping por usuario:** ¿reservas globales en MVP o usamos el `X-User-Id` placeholder desde ya?
3. **Solapamiento de reservas:** ¿validamos disponibilidad por fechas en esta versión o lo dejamos para la próxima?
4. **Seed de datos:** ¿generamos 10.000 registros sintéticos (como el mock) o cargamos un catálogo más curado?
5. **Specs del vehículo:** ¿el backend puede proveerlos pronto o seguimos con valores hardcodeados en el cliente?
6. **Dominio:** ¿usamos `*.workers.dev` o configuramos un dominio custom en Cloudflare?
