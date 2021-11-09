import React, { useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'; 
import clienteAxios from '../../config/axios';
import Areas from '../areas/Areas';

// import el Context
import { CRMContext } from '../../context/CRMContext';

function NuevoEmpleado({history}){

    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    // empleado = state, guardarempleado = funcion para guardar el state
    const[empleado, guardarEmpleado] = useState({
        nombres: '',
        apellidos: '',
        tipo_documento : '',
        documento: '',
        area :'',
        subarea :''
    });

    // leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el empleado escribe en el state
        guardarEmpleado({
            // obtener una copia del state actual
            ...empleado, 
            [e.target.name] : e.target.value
        })

    }

    // Añade en la REST API un empleado nuevo
    const agregarEmpleado = e => {
        e.preventDefault();

        // enviar petición
        clienteAxios.post('/empleados', empleado, {
            headers: {
                Authorization : `Bearer ${auth.token}`
            }
        })   
                 .then(res => {
                // validar si hay errores de mongo 
                if(res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese empleado ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Se agregó el Cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
                // Redireccionar
                history.push('/');
            });
    }

    // Validar el formulario
    const validarEmpleado = () => {
        // Destructuring
        const { nombres, apellidos, tipo_documento, documento, area, subarea} = empleado;

        // revisar que las propiedades del state tengan contenido
        let valido = !nombres.length || !apellidos.length || !tipo_documento.length || !documento.length;

        // return true o false
        return valido;
    }

    // verificar si el empleado esta autenticado o no
    if(!auth.auth && (localStorage.getItem('token') === auth.token ) ) {
        history.push('/iniciar-sesion');
    }

    return (

        <div className="card border-success mb-3 " >
            <h2 className="text-white">Nuevo Empleado</h2>
            
            <form
                className= "bs-component"
                onSubmit={agregarEmpleado}
            >
                <h1 className="card-header text-center bg-secondary">Llena todos los campos</h1>
                <div className="form-floating mb-3">
                    <input  type="text"
                            className="form-control" 
                            placeholder="Nombres Empleado" 
                            name="nombres"
                            onChange={actualizarState}
                    />
                    <label className="floatingInput">Nombres:</label>
                </div>

                <div className="form-floating mb-3">
                    
                    <input  type="text" 
                            className="form-control" 
                            placeholder="Apellidos Empleado" 
                            name="apellidos" 
                            onChange={actualizarState}
                    />
                    <label>Apellidos:</label>
                </div>
            
                <div className="form-floating mb-3">
                    
                    <input  type="text" 
                            className="form-control" 
                            placeholder="Tipo de documento" 
                            name="tipo_documento" 
                            onChange={actualizarState}
                    />
                    <label className="floatingInput">Tipo de Documento:</label>
                </div>

                <div className="form-floating mb-3">
                    
                    <input  type="text" 
                            className="form-control" 
                            placeholder="Numero de documento" 
                            name="documento" 
                            onChange={actualizarState}
                    />
                    <label className="floatingInput">Documento:</label>
                </div>

                <Areas />

                <div className="form-floating mb-3">
                    <input  type="submit" 
                            className="btn btn-success" 
                            value="Agregar Empleado" 
                            disabled={ validarEmpleado() }
                    />
                </div>
            </form>
        </div>
    )
}

export default  withRouter(NuevoEmpleado);