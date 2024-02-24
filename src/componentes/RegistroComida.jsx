import React, { useEffect, useState } from 'react'
import { borrarRegistro } from '../features/registrosSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegistroComida = ({ id, idAlimento, idUsuario, cantidad, fecha }) => {

    const navigate = useNavigate();
    useEffect(()=> {
        if(localStorage.getItem("IDLogueado") === null){
            navigate("/");
        }
    })

    // const registros = useSelector(state => state.registros.registrosLista);
    // const alimentos = useSelector(state => state.alimentos.listAlimentos);
    // const [nombreAlimento, setNombreAlimento] = useState("");


    // const obtenerNombreAlimentoPorId = (idA) => {
    //     // Suponiendo que alimentos es un array de objetos con una estructura similar a { id, nombre }
    //     const alimentoEncontrado = alimentos.find(alimento => alimento.id === idA);
        
    //     if (alimentoEncontrado) {
    //       return alimentoEncontrado.nombre;
    //     }
    //   };

    // const obtenerNombreAlimento = (idA) => {
    //   // Suponiendo que alimentos es un array de objetos con una estructura similar a { id, nombre }
    //   const alimentoEncontrado = alimentos.find(alimento => alimento.id === idA);
      
    //   if (alimentoEncontrado) {
    //     setNombreAlimento(alimentoEncontrado.nombre);
    //   }
    // };

    // useEffect(() => {
    //     // Suponiendo que tienes una lista de alimentos y un ID de alimento específico
    //     const idAlimentoBuscado = idAlimento; // ID del alimento que deseas buscar
    //     obtenerNombreAlimento(idAlimentoBuscado);
    //   }, [registros]); // El useEffect se ejecutará una vez al montar el componente
    


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

/*

 useEffect(() => {
        const obtenerNombreAlimento = () => {
            // Suponiendo que alimentos es un array de objetos con una estructura similar a { id, nombre }
            const alimentoEncontrado = alimentos.find(alimento => alimento.id === idAlimento);
            
            if (alimentoEncontrado) {
                return alimentoEncontrado.nombre;
            }
          };
      
          // Suponiendo que tienes una lista de alimentos y un ID de alimento específico
          //const idAlimentoBuscado = idAlimento; // ID del alimento que deseas buscar
          setNombreAlimento(obtenerNombreAlimento());
          //obtenerNombreAlimento(idAlimentoBuscado);
    }, [])
*/