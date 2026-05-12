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

const colores = ['rojo', 'azul', 'blanco', 'negro', 'gris']

const crearVehiculo = (index) => {
    const marca = marcas[index % marcas.length]
    const modelo = marca.modelos[index % marca.modelos.length]

    return {
        id: index + 1,
        marca: marca.nombre,
        modelo,
        anio: 2024 - (index % 5),
        color: colores[index % colores.length],
        precio: 1000 + index * 150,
        imagen: `https://media.toyota.com.ar/5019492b-2618-458b-91ee-6cefd1ca98a0.png`,
    }
}

const vehiculos = Array.from({ length: MAX_VEHICULOS }, (_, index) => crearVehiculo(index))

export { crearVehiculo, vehiculos }