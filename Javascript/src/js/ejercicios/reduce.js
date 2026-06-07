import { personas } from './personas'
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

console.log('Listado Original:', personas)

const agrupaPersonas = (listaPersonas) => {
    return listaPersonas.reduce((grupo, persona) => {

        console.log(grupo, persona, persona.firstName[0])
        const primeraLetra = persona.firstName[0]

        if(!(primeraLetra in grupo)){

            grupo[primeraLetra] = []
        }

        grupo[primeraLetra].push(persona)

        return {
            ...grupo
        }
    }, {})
}

const agrupaPersonas2 = (listaPersonas) => {
    return listaPersonas.reduce((grupo, persona) => {
        const letra = persona.firstName[0]

        // Operador split para generar y/o modificar objetos iterables.
        return {
            ...grupo,

            //para cada iteracion , confirmo que es un contacto segun la primera letra.

            // [...(grupo[letra])] => hace es un spread del array de personas. Donde supuestamente existe en grupo[letra].
            // si no existe algo en grupo[letra], es decir NO hay elementos aun, se lo creo utilizando el operador || [].

            [letra]: [...(grupo[letra] || []), persona]
        }

    }, {})
}

// const listaFinal = agrupaPersonas(personas)
// console.table(listaFinal)
const listaFinal2 = agrupaPersonas2(personas)
console.table(listaFinal2)


/**
 * CONSIGNA FINAL: Con el objeto de contactos agrupados por la primera letra del nombre,
 * crear una funcion que devuelva un array agrupados por titulo (primera letra) y ordenado alfabeticamente.
 * 
 * Output esperado:
 * 
 * [
 *  {
 *    title: "A",
 *    data: [{}, {}, ..., {}]
 *  },
 *  {
 *    title: "C",
 *    data: [{}, {}, ..., {}]
 *  },
 *  {
 *    title: "R",
 *    data: [{}, {}, ..., {}]
 *  },
 * ]
 * 
 */
