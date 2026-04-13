function saludo(){
  console.log('Hola soy ' + this.nombre) 
}

const o = new Object()


console.log('hola mundo... ', o)

o.nombre = 'Carlos'
o.apellido = 'Tevez'
o.activo = false
o.edad = 40
o.club = ['Boca', 'Man U', 'Juventus', 5.6, new Object()]

o.saluda = saludo

console.log(o, typeof o)

o.saluda()


console.log('-----------------')

const o1 = {}

const key = 'edad'
const value = 33

o1[key] = value
console.log(o1)





console.log('-----------------')
const o2 = {
  nombre: 'Daniel',
  edad: 35,
  profesion: 'Software Engineer',
  education: [
    {
      titulo: 'Bs Computer Engineer',
      anio: 2013 
    },
    {
      title: 'MSC Computer Engineer',
      anio: 2019
    }
  ]
}


console.log(o2)

