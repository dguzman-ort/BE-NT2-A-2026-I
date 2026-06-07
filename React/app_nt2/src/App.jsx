import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Saludo from './components/Saludo'


function App() {
  const [nombre, setNombre] = useState('')

  const cambiarNombre = () => {
    const nuevoNombre = prompt('Ingrese un nombre')

    if (nuevoNombre) {
      setNombre(nuevoNombre)
      console.log(nombre)
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <Saludo />
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Saludo nombre={nombre} />
        <Saludo />
        <Saludo />

        <button className="counter" onClick={cambiarNombre}>Cambiar Nombre</button>
        {/* <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button> */}
      </section>

      
    </>
  )
}

export default App
