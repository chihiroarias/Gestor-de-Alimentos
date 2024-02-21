import React from 'react'
import { borrarRegistro } from '../features/registrosSlice';
import { useDispatch } from 'react-redux';

const RegistroComida = ({ id, idAlimento, idUsuario, cantidad, fecha }) => {

    const url = 'https://calcount.develotion.com';
    const iduser = localStorage.getItem("IDLogueado");
    const tok = localStorage.getItem("TokenLogueado");
    
    const dispatch = useDispatch();

    const dispararDispatch = (datos) => {
        dispatch(borrarRegistro(datos));
      };

    const eliminarRegistro = () => {
        console.log("ID REGISTRO: " + id);
        console.log("ID USER:" + iduser);


        fetch(url + `/registros.php?idRegistro=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'apikey': tok,
                'iduser': iduser
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.mensaje);
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Esto es lo de eliminar:" + responseData.mensaje);
                dispararDispatch(id);
            })
            .catch(error => {
                console.log(error.message);
            });


    }


    return (
        <div>
            <p>
                Id: {id} | Alimento: {idAlimento} | Usuario: {idUsuario} | Cantidad: {cantidad} | Fecha: {fecha}
                <button onClick={eliminarRegistro}>X</button>
            </p>
        </div>
    );
};

export default RegistroComida