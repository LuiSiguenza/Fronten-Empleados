import React, {useContext} from "react";
import { useClienteAxios } from "../hooks/useClienteAxios";
import { CRMContext } from '../../context/CRMContext';

const SelectList = ({url,handledChange,title}) =>{
    const {data, error} = useClienteAxios(url);

    const [auth, guardarAuth ] = useContext( CRMContext );

if(!data) return null;

let options = data;
        return(
            <select className="form-select" onChange={handledChange}>
                <option value="">Selecciones un {title}</option>
                {data && options.map((el) => <option key={el._id}>{el.area}</option>)}
                
            </select>
        )
}

export default SelectList;