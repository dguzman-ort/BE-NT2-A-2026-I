import { personas } from './personas'

/**
 * Hacer una funcion que dado un Array de participantes del curso, 
 * me devuelva el alumno con mayor edad.
 * 
 * [
 *  {
 *    firstName,
 *    lastName,
 *    age
 *  },
 *  ...,
 *  n
 * ]
 */

//console.log(personas)

// O(n)
const devuelveAlumnoMayorEdad = (participantes) => {

  let mayor = participantes[0]
  for(let i = 1; i < participantes.length; i++){
    if(participantes[i].age > mayor.age){
      mayor = participantes[i]
    }
  }

  return { ...mayor }
}

const devuelveAlumnoMayorEdad2 = (participantes) => {
  return participantes.reduce((mayor, participante) =>{
    // console.log(mayor, participante)
    const esMayor = (participante.age > (mayor.age || 0))

    return esMayor ? { ...participante} : mayor
  }, {})
}

const alumnoMayor = devuelveAlumnoMayorEdad2(personas)
console.table(alumnoMayor)

//alumnoMayor.age = 100

console.log(personas)

