const miFuncion = (function(){
  var mensaje = "Hola mundo"

  console.log(mensaje)

  function saludando() {
    console.log(`Mensaje dentro del clousure: ${mensaje}`)
  }

  return saludando

})()

console.log(typeof miFuncion)

miFuncion()

console.log(typeof mensaje)


const counter = (function () {
  let cont = 0

  console.log("--- Inicializando objeto counter ---") 

  function show() {
    console.log(cont)
  }

  function get() {
    return cont
  }

  const inc = function() {
    cont = cont + 1
  }

  const dec = () => {
    cont--
  }

  return {
    showCount: show,
    inc, 
    dec,
    get
  }
})()


console.log('counter', counter)

console.log(counter.get())

/*
counter.showCount()
counter.inc()
counter.inc()
counter.inc()
counter.showCount()
*/