import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes";

function App() {

  const [ listadoPacientes , setListadoPacientes ] = useState([]);
  const [ paciente , setPaciente ] = useState({});



  useEffect( () => {
    const obtenerLS = () => {
      const contenidoLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      console.log( contenidoLS );
      setListadoPacientes( contenidoLS );
    }
    obtenerLS();
  } , [])

  useEffect( ( ) => {
    localStorage.setItem('pacientes' , JSON.stringify(listadoPacientes) )
  } , [ listadoPacientes ]);

  const eliminarPaciente = ( id ) => {
    const pacientesActualizados = listadoPacientes.filter( paciente  => paciente.id !== id );
    setListadoPacientes( pacientesActualizados );
  }

  return (
    <div className="container mx-auto mt-20 px-4">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario 
          listadoPacientes = { listadoPacientes }
          setListadoPacientes = { setListadoPacientes }
          paciente={ paciente }
          setPaciente={ setPaciente }
           />

        <ListadoPacientes
          listadoPacientes={ listadoPacientes }
          setPaciente={ setPaciente }
          eliminarPaciente={ eliminarPaciente }
        />
      </div>
    </div>
  )
}

export default App;
