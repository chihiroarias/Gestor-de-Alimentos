import React, { useEffect, useRef, useState } from 'react'
import {guardarAlimentos} from "../features/alimentosSlice";
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { guardarUnRegistro } from '../features/registrosSlice';

let url ="https://calcount.develotion.com/";

let token = localStorage.getItem("TokenLogueado");
let id = localStorage.getItem("IDLogueado");

const AgregarRegistro = () => {

  const [mensaje, setMensaje] = useState("");
  const cantCalorias = useRef(null);
  const fcha = useRef(null);
  const slcAlimentos = useRef(null);

  

  const dispatch = useDispatch();
  const alimentosLista = useSelector(state => state.alimentos.listAlimentos)

  const enviarDato = (datos) => {
    dispatch(guardarUnRegistro(datos));
  };

  useEffect(() => {
    fetch(url + '/alimentos.php',{
      method:'GET', 
      headers: {
        'Content-Type': 'application/json',
        "apikey": token,
        "iduser": id
      }
    })
    .then(r=>r.json())
    .then(datos=>{
      console.log(datos);
      dispatch(guardarAlimentos(datos.alimentos));
    })
  }, []);


  

  const Registrar = () =>{

    const tok = localStorage.getItem("TokenLogueado");
    const idus = localStorage.getItem("IDLogueado");

    const alimento = slcAlimentos.current.value;
    const cantidad = cantCalorias.current.value;
    const fecha = fcha.current.value;


    
    
    // && fecha >= Date.now()
    if(cantidad > 0){
      let cantidadTotal = alimentosLista.find(a=> a.id ==alimento);
      let convert = cantidadTotal.porcion.replace(/[^0-9.]/g, '');
      let cantidadParseada = parseInt(convert);
      
      const obj = {
        id: 0,
        idAlimento: alimento,
        idUsuario: idus,
        cantidad: cantidadParseada * cantidad,
        fecha: fecha
      }
      
      fetch(url + '/registros.php',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          "apikey": tok,
          "iduser": idus
        },
        body: JSON.stringify({
          "idAlimento": alimento,
          "idUsuario": idus,
          "cantidad": cantidadParseada * cantidad,
          "fecha": fecha
        })
      })
      .then(r=>r.json())
      .then(datos=>{ 
        console.log(datos);
        obj.id = datos.idRegistro;
        console.log(obj);
        enviarDato(obj);
      })
      .catch(error => {
        alert(error.message);
        setMensaje("Credenciales no válidas");
      });

    }else{
      setMensaje("Datos incorrectos");
    }
  }

  return (

   
    <div className="Agregar-Registro">
      <select ref={slcAlimentos}>
        {alimentosLista.map(alimento => (
          <option key={alimento.id} value={alimento.id}>{alimento.nombre}</option>
        ))}
      </select> 
      <label htmlFor="Unidades">Cantidad: </label>
      <input type="number" id="Unidades" ref={cantCalorias}/>

      <label htmlFor="fcha">Fecha</label>
      <input type="date" id="fcha" ref={fcha}/> 
      <p></p>

      <input type="button" value="REGISTRAR" onClick={Registrar}/>
      <article>
                <p>{mensaje}</p>
      </article>
    </div> 

    
  )
}

export default AgregarRegistro

/*  
<!-- seleccionar G , M , U DEPENDIENDO DE LA CANTIDAD DEFINIMOS ACORDE-->
<!-- Solo hoy y ayer, no mañana-->

    POST
curl --location -g '{{calcount}}/registros.php' \
--header 'Content-Type: application/json' \
--header 'apikey: e827ae9286583d79f71670c31c992531' \
--header 'iduser: 7' \
--data '{
    "idAlimento": 8,
    "idUsuario": 7,
    "cantidad": 200,
    "fecha": "2023-09-21"
}'
*/
