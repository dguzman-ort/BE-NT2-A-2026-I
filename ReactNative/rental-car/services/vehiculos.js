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

const getVehiculoById = (id) => {
    return new Promise((resolve) => {
        // console.log('getVehiculoById', id);
        setTimeout(() => {
            resolve(vehiculos.find((vehiculo) => vehiculo.id === id));
        }, 1000); // Simular una demora de 1 segundo
    });
}
const getVehiculos = () => {
    return new Promise((resolve) => {
        
        // console.log('getVehiculos');
        setTimeout(() => {
            resolve(vehiculos);
        }, 1000); // Simular una demora de 1 segundo
    });
}


export { getVehiculos, getVehiculoById }