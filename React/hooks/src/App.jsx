import { useEffect, useState } from 'react'
import './App.css'
import Cronometro from './components/cronometro'
import Control from './components/control'
import { IniciadoProvider } from './hooks/useIniciado'

function App() {

  
  // const [name, setName] = useState('')
  
  // useEffect(() =>{
  //   console.log('1.- MOUNTING - Inincio del componente')
  //   return () => {
  //     console.log('2.- UNMOUNTING - Fin del componente')
  //   }
  // }, [])

  // useEffect(() =>{
    
  //   if (count % 2 === 0)
  //     console.log('3.- UPDATE - Actualización del componente', count)
  // }, [count])

  // useEffect(() =>{
  //   if (name.length > 0)
  //     console.log('4.- UPDATE - Actualización del componente', name)
  // }, [name])

  // useEffect(() =>{
  //   console.log('5.- UPDATE - Actualización del componente', count, name)
  // }, [count, name])

  return (
    <IniciadoProvider>
      <Cronometro />
      <Control />
    </IniciadoProvider>
  )
}

export default App
