import { personas, EDAD_MINIMA } from './personas'
//Referencia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

/**
 * CONSIGNA:realizar una funcion que dado un array de objetos persona devuelva
 * un nuevo array solamente con las personas que puedan entrar al casino (age > 21)
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

console.log('Listado Original:', personas)

const filtraPersonas = (listaPersonas) => {
  return listaPersonas.filter(persona => persona.age >= EDAD_MINIMA)
}

const personasFiltradas = filtraPersonas(personas)
console.table(personasFiltradas)

import { personas } from "./personas.js";
import { EDAD_MINIMA } from "./personas.js";
let personasAptasCasino = personas.filter(personas => personas.age > EDAD_MINIMA);
//consigna dice >21 pero entiendo que los de >= de 21 deberian poder entrar, por las dudas lo puse como en la consigna
console.log(personasAptasCasino);
