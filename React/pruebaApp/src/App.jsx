import { useState } from 'react'
import UsuarioCard from './componentes/UsuarioCard'
import Selector from './componentes/SelectorTalle'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div>
          <h1>Usuario card</h1>
          <ul>
         <li >
          <UsuarioCard nombre={"juan"} edad={"25"} profesion={"programador"}/> </li>
          <li><UsuarioCard nombre={"sofia"} edad={"24"} profesion={"diseñadora"}/></li>
          <li><UsuarioCard nombre={"zak"} edad={"24"} profesion={"genio"}/></li>
            </ul>
            </div>

          <div>
            <h1>Seleccionar talle</h1>
            <Selector />
          </div>




        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
        <p> "hola" </p>
 
      {}

     
    </>
  )
}

export default App
