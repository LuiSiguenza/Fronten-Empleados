import React, { useState } from 'react';

import {withRouter} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

const Busqueda =  (paramet) => {

    const [nElementos, setNElementos] = useState(paramet.data);
    const [tablaElementos, setTablaElementos]= useState(paramet.data);
    const [busqueda, setBusqueda]= useState("");

    const usersPerPage = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const pageVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(nElementos.length/usersPerPage)
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaElementos.filter((elemento)=>{
            if(elemento.nombres.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.documento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){               
                
                return elemento;  
                       
            }    
        });
        setNElementos(resultadosBusqueda);  
        
    }                       
                    
    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const changePage= ({selected}) =>{
        setPageNumber(selected)
    };
    
    const displayElementos = nElementos.slice(pageVisited,pageVisited+usersPerPage).map((nuevoElemento) =>(
        <paramet.FuncionElemento 
            key={nuevoElemento._id}
            empleado={nuevoElemento}
        />         

))

    return (       
        <div className="w-100">
                <form className="d-flex mx-1 my-1 px-1 py-1">
                    <input  className="form-control me-sm-2" 
                            type="text" 
                            value={busqueda} 
                            placeholder="Búsqueda por Nombre o Documento" 
                            onChange={handleChange} 
                    />
                    <button className="btn btn-outline-primary" >
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </form>
                    
                <ul className="list-group">
                {displayElementos}
                </ul>
                
                <ReactPaginate 
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination pagination-lg justify-content-center"}
                    pageClassName={"page-link"}
                    previousLinkClassName={"page-link"}
                    activeLinkClassName={"page-item active"}
                    nextLinkClassName={"page-link"}
                    disabledClassName={"page-item disabled"}
                    activeClassName={"page-item active"}
                />
        </div>
    )
}

export default withRouter(Busqueda);