import React, { Fragment, useContext }  from "react";
import { useClienteAxios } from "../hooks/useClienteAxios";
import { CRMContext } from '../../context/CRMContext';

const SelectList = ({url,handledChange,title}) =>{
    
    const [auth, guardarAuth ] = useContext( CRMContext );    
    const {data, error} = useClienteAxios(url);

    if(!data) return null;
    try {
    } catch (error) {
        
    } 
    let options = data[0].subarea;
    console.log(options)
            return(
            <Fragment>
                <select className="form-select" onChange={handledChange} >
                    <option value="">Selecciones un {title}</option> 
                    {data && options.map((el,i) => <option key={el+i}>{el}</option>)}
                    
                </select>
            </Fragment>
            )
}

export default SelectList;