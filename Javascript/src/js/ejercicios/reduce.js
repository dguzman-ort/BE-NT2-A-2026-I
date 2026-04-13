// Referencia: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

/**
 * CONSIGNA FINAL: Dada una lista de contactos, crear una funcion que agrupe los 
 * contactos segun la primera letra de su nombre (nombre completo). 
 * Esta seria la estructura esperada:
 * 
 * {
 * 
 *    M: [{}, {}, ..., {} ],
 *    C: [{}, {}, ..., {}]
 *    L: [{nombreCompleto: "Landa, Gabriel", edad: 48, telefono: "22-121-941"}, ..., {}]
 * 
 * }
 * 
 */

import {personas} from "./personas.js";

const agregarNombreCompleto = (personas)=>{
    return personas.map((persona) => {
        let nombreCompleto = persona.lastName + " "+ persona.firstName;
        return {...persona,
            nombreCompleto
        };
    });
};

const agrupaContactos = (personas) => {
    return personas.reduce((acc, persona) => {
       let lastname = persona.lastName;
        let letra = lastname[0];
        if(acc [letra] == null){
            acc[letra] = [];
        } 
        acc[letra].push({nombreCompleto: persona.lastName+", "+persona.firstName, ...persona});
   return acc;
    })
}
let contactosPorLetra = agrupaContactos(personas);
console.log(contactosPorLetra);
