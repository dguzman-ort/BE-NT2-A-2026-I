function obtenerUsuarioBD(callback){
  // Esta funcion simula una llamada a una API para obtener un usuario de la DB

  setTimeout(() => {
    // Esta data es la que devuelve mi API

    const userData = {
      firstName: 'Andres',
      lastName: 'Gomez',
      age: 16
    }

    if (typeof callback === 'function'){
      return callback(userData)
    }else{
      console.warn('No se recibio callback')
    }
    


  }, 3000)

}

function saludoUser(user){
  console.log(`Hola ${user.firstName} ${user.lastName}, como estas?`, )
}

function validarEdad(user){
  if (user.age >= 18){
    console.log(`Hola ${user.firstName} ${user.lastName}, Bienvenido a la fiesta `)
  }else{
    console.warn('No tiene edad suficiente')
  }
}

console.log(typeof obtenerUsuarioBD)

//obtenerUsuarioBD(console.log)

//obtenerUsuarioBD(saludoUser)

obtenerUsuarioBD(validarEdad)