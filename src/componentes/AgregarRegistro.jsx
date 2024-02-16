import React from 'react'

let url ="https://calcount.develotion.com/";

const AgregarRegistro = () => {
  
  const Registrar = () =>{}
  return (

   
    <div className="Agregar-Registro">
      <select></select> 
      <label htmlFor="Unidades">Cantidad de calorias</label>
      <input type="number" id="Unidades"/>

      <label htmlFor="fcha">Fecha</label>
      <input type="date" id="fcha"/> 

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