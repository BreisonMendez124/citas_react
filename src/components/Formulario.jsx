import { useEffect, useState } from "react";
import Error from "./Error";

const Formulario = ( { listadoPacientes , setListadoPacientes , paciente , setPaciente } ) => {

    const [ nombreMascota , setMascota ] = useState("");
    const [ nombrePropietario , setPropietario ] = useState("");
    const [ email , setEmail ] = useState("");
    const [ fecha , setFecha ] = useState("");
    const [ sintomas , setSintomas ] = useState("");
    const [ error , setError ] = useState( false );


    const generarId = () => {
        const random = Math.random().toString( 36 ).substring(2);
        const fechaRandom = Date.now().toString( 36 );
        return random + fechaRandom;
    }

    useEffect( () => {
        if( Object.keys( paciente ).length > 0 ){
            setMascota( paciente.nombreMascota );
            setPropietario( paciente.nombrePropietario );
            setEmail( paciente.email );
            setFecha( paciente.fecha );
            setSintomas( paciente.sintomas );
        }
    } ,[paciente]);


    const handleSubmit = ( event ) => {
        event.preventDefault();

        if( [ nombreMascota , nombrePropietario , email , fecha , sintomas ].includes('') ){
            console.log("Todos los campos son obligatorios")
            setError( true );
            return;
        }

        setError( false );

        const objectoPacientes = {
            nombreMascota , 
            nombrePropietario , 
            email , 
            fecha , 
            sintomas
        }

        if( paciente.id ){
            //Actualiza registro
            objectoPacientes.id = paciente.id;
            const pacienteActualizado = listadoPacientes.map( pacienteState => 
                pacienteState.id === paciente.id ? objectoPacientes : paciente);
            setListadoPacientes( pacienteActualizado );
            setPaciente({});
            

        }else{
            //Nuevo registro
            objectoPacientes.id = generarId();
            setListadoPacientes([...listadoPacientes , objectoPacientes ]);
        }

        setMascota('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

        console.log("enviando formulario")
        
    }

    return( 
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Agrega pacientes y <span className="text-indigo-600 font-bold"> Administralos </span> 
            </p>

            <form
                onSubmit={handleSubmit} 
                className=" bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                
                { error && 
                        <Error>
                            <p 
                                className="text-center text-white font-bold uppercase"> 
                                Todos los campos son obligatorios 
                            </p>
                        </Error>
                }
                <div className="mb-5">
                    <label htmlFor="mascota" className=" block text-gray-600 uppercase font-bold">Nombre mascota</label>
                    <input 
                         id="mascota"
                         type="text"
                         placeholder="Nombre mascota"
                         className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                         value={ nombreMascota }
                         onChange={ ( event ) => setMascota( event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="nombrePropietario"  
                           className=" block text-gray-600 uppercase font-bold">Nombre propietario</label>
                    <input 
                         id="nombrePropietario"
                         type="text"
                         placeholder="Nombre del propietario"
                         className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                         value={ nombrePropietario }
                         onChange={ ( event ) => setPropietario( event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email"  
                           className=" block text-gray-600 uppercase font-bold">Email</label>
                    <input 
                         id="email"
                         type="email"
                         placeholder="Email contacto propietario"
                         className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                         value={ email }
                         onChange={ ( event ) => setEmail( event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta"  
                           className=" block text-gray-600 uppercase font-bold">Alta</label>
                    <input 
                         id="alta"
                         type="date"
                         className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                         value={ fecha }
                         onChange={ ( event ) => setFecha( event.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas"  
                           className=" block text-gray-600 uppercase font-bold">Síntomas</label>
                    <textarea 
                              id="sintomas" 
                              className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                              placeholder="Describe los síntomas"
                              value={ sintomas }
                              onChange={ ( event ) => setSintomas( event.target.value) }
                    ></textarea>
                </div>

                <input 
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                        value={ paciente.id ? "Editar paciente" : "Agregar paciente"} />
            </form>
        </div>
    )
}

export default Formulario;