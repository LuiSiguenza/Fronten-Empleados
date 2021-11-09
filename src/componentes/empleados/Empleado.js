import React , {useContext} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

function Empleado({ empleado }) {
	// extraer los valores
	const [auth, guardarAuth ] = useContext( CRMContext );
	const { _id, nombres, apellidos, tipo_documento, documento, area, subarea } = empleado;

	// Eliminar empleado
	const eliminarEmpleado = idEmpleado => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: "Un emplead eliminado no se puede recuperar",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
                // Llamado a axios
                clienteAxios.delete(`/empleados/${idEmpleado}`)
                    .then(res => {
                        Swal.fire(  
                            'Eliminado', 
                            res.data.mensaje, 
                            'success'
                        );
                    });
			}
		});
	};

	return (
		<div className="card border-light mb-3">
			<li className="list-group-item list-group-item-action my-1 px-2 py-1">
				<div className="row mx-1">
				<div className="info-cliente w-75">
					<h2 className="text-white">
						Nombre: {nombres} {apellidos}
					</h2>
					<h3>Area: {area}</h3>
					<h3>Subarea: {subarea}</h3>
					<h3>Tipo de documento: {tipo_documento}</h3>
					<h4>Documento N°: {documento}</h4>
				</div>
				<div className="w-25">
					<Link to={`/empleados/editar/${_id}`} className="btn btn-info">
						<i className="fas fa-pen-alt" />
						Editar Empleado
					</Link>

					<button 
						type="button" 
						className="btn btn-danger" 
						onClick={() => eliminarEmpleado(_id)}
					>
						<i className="fas fa-times" />
						Eliminar Empleado
					</button>
				</div>
				</div>
			</li>
		</div>
	);
}
export default withRouter(Empleado);
