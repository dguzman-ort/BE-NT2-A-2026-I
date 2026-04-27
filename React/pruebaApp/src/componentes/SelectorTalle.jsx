import { useState } from 'react'

const Selector =(({})=>{

const [talle, setTalle] = useState("S");

return(
  <>
    <p>Talle seleccionado: {talle}</p>
    <button type="button" 
    onClick={()=> setTalle("S")}>S</button>
    <button type="button"
    onClick={()=> setTalle("M")}>M</button>
    <button type="button"
    onClick={()=> setTalle("L")}>L</button>
  </>

)
})

export default Selector;