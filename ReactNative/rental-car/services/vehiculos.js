const BASE_URL = 'https://localhost:8787'
// const BASE_URL = 'https://ff21-2800-810-54b-1539-803c-f9a6-9263-17da.ngrok-free.app'

const MAX_VEHICULOS = 10000

const marcas = [
    {
        nombre: 'Toyota',
        modelos: ['Yaris', 'Corolla', 'Hilux'],
    },
    {
        nombre: 'Ford',
        modelos: ['Fiesta', 'Focus', 'Ranger'],
    },
    {
        nombre: 'Peugeot',
        modelos: ['208', '308', 'Partner'],
    },
    {
        nombre: 'Fiat',
        modelos: ['Cronos', 'Argo', 'Toro'],
    },
]

const ubicaciones = [
    {
        nombre: 'Buenos Aires, Argentina',
        latitude: -34.6037,
        longitude: -58.3816,
        casa_rental: 'Budgets Cars',
    },
    {
        nombre: 'Córdoba, Argentina',
        latitude: -31.420085,
        longitude: -64.188613,
        casa_rental: 'Rent a Car, co',
    },
    {
        nombre: 'Rosario, Argentina',
        latitude: -32.954539,
        longitude: -60.639262,
        casa_rental: 'Hertz Cars',
    },
]

const colores = ['rojo', 'azul', 'blanco', 'negro', 'gris']
const categorias = ['Luxury', 'SUV', 'Sedan', 'Electric', 'Sports']

const crearVehiculo = (index) => {
    const marca = marcas[index % marcas.length]
    const modelo = marca.modelos[index % marca.modelos.length]
    const ubicacion = ubicaciones[index % ubicaciones.length]
    return {
        id: index + 1,
        marca: marca.nombre,
        modelo,
        anio: 2024 - (index % 5),
        color: colores[index % colores.length],
        categoria: categorias[index % categorias.length],
        precio: 1000 + index * 150,
        imagen: `https://media.toyota.com.ar/5019492b-2618-458b-91ee-6cefd1ca98a0.png`,
        location: ubicacion.nombre,
        latitude: ubicacion.latitude,
        longitude: ubicacion.longitude,
        casa_rental: ubicacion.casa_rental,
    }
}

const vehiculos = Array.from({ length: MAX_VEHICULOS }, (_, index) => crearVehiculo(index))

const getVehiculoById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/vehicles/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle by id');
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching vehicle by id:', error);
        throw error;
    }
}
const getVehiculos = async () => {
    
    try {
        const response = await fetch(`${BASE_URL}/api/v1/vehicles`)
        const { data, pagination } = await response.json()
        console.log('data', data);
        return data
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
}

const getBookings = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
            headers: {
                'X-User-Id': '123',
            },
        })
        const { data, pagination } = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
}

const bookVehicle = async (vehicleId, startDate, endDate) => {
    //const accessToken = await getAccessToken()
    try {
        const body = {
            vehicle_id: vehicleId,
            start_date: startDate,
            end_date: endDate,
        }
        const response = await fetch(`${BASE_URL}/api/v1/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`,
                'X-User-Id': '123',
            },
            body: JSON.stringify(body),
        })
        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            const message = errorData?.error?.message || 'Failed to reserve vehicle'
            throw new Error(message);
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error reserving vehicle:', error);
        throw error;
    }
}
    



export { getVehiculos, getVehiculoById, bookVehicle, getBookings }