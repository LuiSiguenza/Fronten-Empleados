import React, {useContext} from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootswatch/dist/superhero/bootstrap.css'
/*** Layout */
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';
import Bienvenida from './componentes/layout/Bienvenida';

/** Componentes */


import Empleados from './componentes/empleados/Empleados';
import NuevoEmpleado from './componentes/empleados/NuevoEmpleado';
import EditarEmpleado from './componentes/empleados/EditarEmpleado';

import Login from './componentes/auth/Login';

import { CRMContext, CRMProvider } from './context/CRMContext';

function App() {

    // utilizar context en el componente
    const [ auth, guardarAuth ] = useContext(CRMContext);

    return (
      <Router>
            <CRMProvider value={[ auth, guardarAuth ]}>
            
                <div className="container">
                    <Header />
                </div>
              
                <div className="container">
                
                  <div className="page-header " id="banner">

                      <div className="row">
                        <Navegacion />
                      
                        <div className="col-md-auto w-75 mx-auto">
                          <Switch>
                                
                            <Route exact path="/" component={Bienvenida} />
                            <Route exact path="/empleados" component={Empleados} />
                            <Route exact path="/empleados/nuevo" component={NuevoEmpleado} />
                            <Route exact path="/empleados/editar/:id" component={EditarEmpleado} />

                            <Route exact path="/iniciar-sesion" component={Login} />
                          </Switch>
                        </div>
                      </div>
                    
                  </div>
                </div>
            </CRMProvider>
      </Router>
    )
}

export default App;