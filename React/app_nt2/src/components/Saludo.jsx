const Saludo = ({ nombre, apellido }) => {
    // console.log(nombre, apellido);
    return (
        nombre ? <h3>Hola {nombre} {apellido}</h3> : <></>
    )   
}

export default Saludo;