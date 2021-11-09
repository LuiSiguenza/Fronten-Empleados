import { useEffect, useState, useContext } from "react";
import { CRMContext } from '../../context/CRMContext';
import clienteAxios from '../../config/axios';

export const useClienteAxios =(props) =>{
    const [auth, guardarAuth ] = useContext( CRMContext );
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>{
        
        if(auth.token !== '') {
            // Query a la API
            const axiosData = async () => {
                try {
                    console.log('url en mi hook personalizado',props);
                    const consulta = await clienteAxios.get(props, {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
                    console.log('despues del await');
                    // colocar el resultado en el state
                    console.log(consulta.data);
                    setData(consulta.data);
                    
                    
                } catch (error) {
                    // Error con authorizacion
                    console.log('dentro del catch en mi hook personalizado')
                    if(error.response.status === 500) {
                        
                    }
                }
            }              
            axiosData();
        } else {
            console.log('dentro del else hook personalizado')
        }
        
        console.log('antes del returns');
    },[props]);
    return{data,error};
}