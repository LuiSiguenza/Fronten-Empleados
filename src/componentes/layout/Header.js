import React, {useContext} from 'react';

import { CRMContext } from '../../context/CRMContext';
import {withRouter} from 'react-router-dom';

const Header = (props) => {

    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        // auth.auth = false y el token se remueve
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        // redireccionar
        props.history.push('/iniciar-sesion');
    }

    return (
        <div className="row">
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                
                <div className="collapse navbar-collapse" id="navbarResponsive">
                        
                    <div className="navbar-nav" id="navbarColor01">    
                        <h1>Administrador de Empleados</h1>    
                    </div>
                    
                    { auth.auth ? (
                        <div className= "navbar-nav ms-md-auto">
                            <button 
                                type="button"
                                className="btn btn-danger mw-100"
                                onClick={cerrarSesion}
                            >
                                <i className="far fa-times-circle"></i>
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : null }
                                    
                </div>
            </div>
        </div>
    )

}

export default withRouter(Header);