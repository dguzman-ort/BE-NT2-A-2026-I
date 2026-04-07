(async function() {

  const API_URL = 'https://us-central1-api-nt2-ejemplo.cloudfunctions.net/app/api/readaaaaa'

  const getVehiculos = () => {
    return new Promise((resolve, reject) => {
      console.log('Llamada a la API de vehiculos...')

      fetch(API_URL)
      .then(response => {
        if (response.ok){
          return response.json()
        } else {
          throw new Error('Error al obtener los vehiculos')
        }
      })
      .then(data => {
        resolve(data)
      })

      .catch(error => {
        //console.error('Error', error)
        reject(error)
      })
    })
  }

  /** Asincrono */
 
  
  /*
  const vehiculos = getVehiculos()

  vehiculos.then(data => {
    console.log('Vehiculos => ', data)
  })

  vehiculos.catch(error => {
    console.warn(error)
  })
  
  */

  /** Sincrono */

  try{
    const vehiculos = await getVehiculos()

    console.log('vehiculos', vehiculos)
  }catch(err) {
    console.warn(err)
  }
  


})()

