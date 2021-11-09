import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const Navegacion = () => {

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) return null;

    return ( 
        
            <aside className="col-lg-4 col-md-5 col-sm-6 card border-primary mb-3 w-25">
                <h2 className="card-header text-white">Administración</h2>
                <div className="d-grid gap-2">
                    <div className="btn-group-vertical" >
                        <Link to={"/"} className="btn btn-primary btn-lg">Inicio</Link>
                        <Link to={"/empleados"} className="btn btn-primary btn-lg">Empleados</Link>                
                    </div>
                </div>
            </aside>
     );
}
 
export default Navegacion;