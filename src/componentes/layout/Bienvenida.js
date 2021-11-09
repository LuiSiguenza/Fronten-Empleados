import React, { useContext } from 'react';

import { CRMContext } from '../../context/CRMContext';

function Welcome(props) {
    const [auth, guardarAuth ] = useContext( CRMContext );

    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }

    return(
        <div className="col-lg-4 gy-lg-2 mx-auto w-75" >
            <h1>Bienvenido</h1>
        </div>
    )
}
export default Welcome;