import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

// Context
import { CRMContext } from '../../context/CRMContext';

function Login(props){

    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);

    // State con los datos del formulario
    const [ credenciales, guardarCredenciales] = useState({});

    // iniciar sesión en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();

        // autenticar al usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            
            // extraer el token y colocarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
            guardarAuth({
                token, 
                auth: true
            })

            // alerta
            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            )

            // redireccionar
            props.history.push('/');

            
        } catch (error) {
            if(error.response) {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.mensaje
                })
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error'
                })
            }
            
        }
    }

    // almacenar lo que el usuario escribe en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className="col-lg-4 gy-lg-2 mx-auto" >
            <div className="list-group-item d-flex justify-content-between align-items-center mx-auto">
                
                    <form
                        className= "bs-component"
                        onSubmit={iniciarSesion}
                    >
                        <div className="form-group">
                            <h2 className="form-label text-white text-center">Iniciar Sesión</h2>
                            <div className="form-floating mb-3 ">
                                
                                <input 
                                    type="email" 
                                    className="form-control"  
                                    name="email"
                                    placeholder="Email para Iniciar Sesión"
                                    required
                                    onChange={leerDatos}
                                />
                                <label className="floatingInput">Email</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input 
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={leerDatos}
                                />
                                <label className="floatingInput">Password</label>
                            </div>

                            <input type="submit" value="Iniciar Sesión" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default withRouter(Login);