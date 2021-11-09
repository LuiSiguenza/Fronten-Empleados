import React, { useEffect, useState, useContext } from 'react';

// importar cliente axios
import clienteAxios from '../../config/axios';
import Empleado from './Empleado';
import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';

import BarraBusqueda from '../layout/BarraBusqueda';

// import el Context
import { CRMContext } from '../../context/CRMContext';

function Empleados(props) {
    // Trabajar con el state
    const [ empleados, guardarEmpleados ] = useState([]);
    
    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    const obtenerEmpleados = () => {
        if(auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const empleadosConsulta = await clienteAxios.get('/empleados', {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
    
                    // colocar el resultado en el state
                    guardarEmpleados(empleadosConsulta.data);

                } catch (error) {
                    // Error con authorizacion
                    if(error.response.status === 500) {
                        props.history.push('/iniciar-sesion');
                    }
                }
            }              
              consultarAPI();
        } else {
            props.history.push('/iniciar-sesion');
        }
    }
    
    useEffect( () => {
        obtenerEmpleados();                
    },[empleados] );

    // Si el state esta como false
    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }

    if(!empleados.length) return <Spinner /> 

    return (
            <div className="card border-success mb-3" >
            
                <h2 className="card-header text-white">Empleados</h2>

                <Link to={"/empleados/nuevo"} className="btn btn-info w-25 mx-2 my-1 px-2 py-1"> 
                    <i className="fas fa-plus-circle"></i>
                    Nuevo Empleado
                </Link>
                <BarraBusqueda  data={empleados} FuncionElemento={Empleado} />

            </div>
    )
}

export default withRouter(Empleados);