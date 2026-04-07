const promesa = fetch('https://us-central1-api-nt2-ejemplo.cloudfunctions.net/app/api/read')

console.log(typeof promesa, promesa)

promesa.then(res => {
  return res.json()
})
.then(data => {
  console.log('data', data)
})

promesa.then(res => {
  console.log('Holaaaa, me estoy ejecutando en el then()')
})

promesa.catch(err => {
  console.warn('No se completo la promesa')
})

promesa.finally(() => {
  console.log('No importa que suceda, igual me voy a ejecutar')
})


console.log('Holaaa yo sigo trabajando!')