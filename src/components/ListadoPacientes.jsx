import Paciente from "./Paciente";

const ListadoPacientes = ( { listadoPacientes , setPaciente , eliminarPaciente } ) => {

    return (

    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
        { listadoPacientes && listadoPacientes.length ? ( 
            <>
                <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
                <p className=" text-xl mt-5 mb-10 text-center">
                    Administra tus <span className="text-indigo-600 font-bold "> Pacientes y citas </span>
                </p>

                { listadoPacientes.map( paciente =>  
                    <Paciente 
                        key={ paciente.id } 
                        paciente={ paciente } 
                        setPaciente={ setPaciente }
                        eliminarPaciente={ eliminarPaciente } /> 
                ) }
            </>
        ): ( 
            <>
              <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                <p className=" text-xl mt-5 mb-10 text-center">
                    Agrega pacientes <span className="text-indigo-600 font-bold "> y se reflerán en este lugar </span>
                </p>
            </>
        ) }
        </div>
    )
}

export default ListadoPacientes;