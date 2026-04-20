//Referencia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
import {personas, EDAD_MINIMA} from "./personas.js";
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

function filtroPersonas(personas){
    return personas.filter(persona => persona.age >= EDAD_MINIMA)
}

console.log(filtroPersonas(personas))