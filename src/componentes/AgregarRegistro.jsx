import React, { useEffect, useRef } from 'react'
import {guardarAlimentos} from "../features/alimentosSlice";
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

let url ="https://calcount.develotion.com/";

let token = localStorage.getItem("TokenLogueado");
let id = localStorage.getItem("IDLogueado");

const AgregarRegistro = () => {

  const cantCalorias = useRef(null);
  const fcha = useRef(null);
  const slcAlimentos = useRef(null);

  const dispatch = useDispatch();
  const alimentos = useSelector(state => state.alimentos.listAlimentos)

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
    const alimento = slcAlimentos.current.value;
    const canitdad = cantCalorias.current.value;
    const fecha = fcha.current.value;

    let cantidadTotal = alimentos.find(a=> a.id ===alimento);
    console.log(cantidadTotal);
    

    //let convert = cantidad.replace(/[^0-9.]/g, '');
    
  
  }


  return (

   
    <div className="Agregar-Registro">
      <select ref={slcAlimentos}>
        {alimentos.map(alimento => (
          <option key={alimento.id} value={alimento.id}>{alimento.nombre}</option>
        )) }
      </select> 
      <label htmlFor="Unidades">Cantidad de calorias</label>
      <input type="number" id="Unidades" ref={cantCalorias}/>

      <label htmlFor="fcha">Fecha</label>
      <input type="date" id="fcha" ref={fcha}/> 

      <input type="button" value="REGISTRAR" onClick={Registrar}/>
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


/*
    GET ALIMENTOS PARA EL SELECT
curl --location -g '{{calcount}}/alimentos.php' \
--header 'Content-Type: application/json' \
--header 'apikey: a55b659120747f5404652ae17306275f' \
--header 'iduser: 7'*/