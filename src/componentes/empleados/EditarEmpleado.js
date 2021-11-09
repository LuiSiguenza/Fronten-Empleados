import React, { useState, useEffect,  useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'; 
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';
import Areas from '../areas/Areas';


function EditarEmpleado(props){

    const [auth, guardarAuth ] = useContext( CRMContext );
    const [ narea, guardarAreas ] = useState([]);
    const [ varea, guardarVAreas ] = useState([]);


    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }

    // obtener el ID
    const { id } = props.match.params;

    // cliente = state, datosCliente = funcion para guardar el state
    const[empleado, datosEmpleado] = useState({
        nombres: '',
        apellidos: '',
        tipo_documento : '',
        documento: '',
        area :'',
        subarea :''
    });

    // Query a la API
    const consultarAPI = async () => {
        const empleadoConsulta = await clienteAxios.get(`/empleados/${id}`, {
            headers: {
                Authorization : `Bearer ${auth.token}`
            }
        });

       // colocar en el state
       datosEmpleado(empleadoConsulta.data);
    }

    // useEffect, cuando el componente carga
    useEffect( () => {
        consultarAPI();
    }, []);

    // leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        datosEmpleado({
            // obtener una copia del state actual
            ...empleado, 
            [e.target.name] : e.target.value
        })
    }

    // Envia una petición por axios para actualizar el cliente
    const actualizarEmpleado = e => {
        e.preventDefault();

        // enviar petición por axios
        clienteAxios.put(`/empleados/${empleado._id}`, empleado) 
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
                        'Correcto',
                        'Se actualizó Correctamente',
                        'success'
                    )
                }
                // redireccionar
                props.history.push('/');
            })
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

    return (
        <div className="card border-success mb-3 " >
            <h2 className="text-white">Editar Empleado</h2>
            
            <form   className= "bs-component"
                    onSubmit={actualizarEmpleado}
            >
                <h1 className="card-header text-center bg-secondary">Llena todos los campos</h1>
                <div className="form-floating mb-3">
                    <input  type="text" 
                            className="form-control"
                            placeholder="Nombres Empleado" 
                            name="nombres"
                            onChange={actualizarState}
                            value={empleado.nombres}
                    />
                    <label className="floatingInput">Nombres:</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" 
                            className="form-control"
                            placeholder="Apellidos Empleado" 
                            name="apellidos" 
                            onChange={actualizarState}
                            value={empleado.apellidos}
                    />
                    <label className="floatingInput">Apellidos:</label>
                </div>
            
                <div className="form-floating mb-3">
                    <input type="text" 
                            className="form-control"
                            placeholder="Tipo de documento" 
                            name="tipo_documento" 
                            onChange={actualizarState}
                            value={empleado.tipo_documento}
                    />
                    <label className="floatingInput">Tipo de documento:</label>
                </div>

                <div className="form-floating mb-3">
                    <input  type="text" 
                            className="form-control"
                            placeholder="N° de documento" 
                            name="documento" 
                            onChange={actualizarState}
                            value={empleado.documento}
                    />
                    <label className="floatingInput">N° Documento:</label>
                </div>

                <Areas  valueArea={empleado.area} 
                        valueSubarea={empleado.subarea} 
                        handledChange={(e) =>{  guardarAreas(e.target.name)
                                                guardarVAreas(e.target.value)
                        }}
                        onClick={actualizarState}
                />

                <div className="form-floating mb-3">
                    <input  type="submit" 
                            className="btn btn-primary" 
                            value="Guardar Cambios" 
                            disabled={ validarEmpleado() }
                    />
                </div>
            </form>
        </div>
    )
}

export default  withRouter(EditarEmpleado);