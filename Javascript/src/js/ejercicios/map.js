
// Referencia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

/**
 * CONSIGNA: Realizar una funcion que dado un array de objetos `personas`
 * devuelva un array con un atributo `allowed` (_boolean_) que indique 
 * si puede entrar o no en un casino
 */
import {personas} from "./personas.js";
import { EDAD_MINIMA } from "./personas.js";

function addAllowed(personas, ageMinima){ 
    return personas.map(persona => {
    let allowed= false;
    if(persona.age > ageMinima){
        allowed = true;
    };
    return {
        ...persona,
        allowed
    }
})}
let personasAllowedCasino = addAllowed(personas, EDAD_MINIMA);
console.log(personasAllowedCasino);

