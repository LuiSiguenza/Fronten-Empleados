import React, { useState, useContext, Fragment } from 'react';

// importar cliente axios

import { withRouter } from 'react-router-dom';

import SelectList from '../layout/SelectList';
import SelectListSubarea from '../layout/SelectListSubarea';


// import el Context
import { CRMContext } from '../../context/CRMContext';

function Areas(props) {
    // Trabajar con el state
    const [ narea, guardarAreas ] = useState([]);
    const [ nsubarea, guardarSubareas ] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth ] = useContext( CRMContext );

    // Si el state esta como false
    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }
    
    return (
        <Fragment>
            <div className="form-floating mb-3">
                <SelectList     url="/areas/" 
                                handledChange={(e) =>{guardarAreas(e.target.value)}} 
                                title="area" 
                                name="area"
                                onChange={props.handledChange}
                >
                </SelectList >
                <label className="floatingInput">Area</label>
            </div>

            <div className="form-floating mb-3">
                <SelectListSubarea     url={`/areas/${narea}`} 
                                        handledChange={(e) =>{guardarSubareas(e.target.value)}} 
                                        title="subarea" 
                >
                                        </SelectListSubarea >
                <label className="floatingInput">Subarea</label>
            </div>
        </Fragment>
    )
    
}

export default withRouter(Areas);