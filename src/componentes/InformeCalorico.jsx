import React from 'react'

let url = "https://calcount.develotion.com/";

const InformeCalorico = () => {
  return (
    <div className="informe-calorico">
      <h3>Calorias totales</h3>

      
      <h3>Calorias diarias</h3>
    </div>
  )
}

export default InformeCalorico





/*

<!--CAMBIAR EL COLOR SI SE EXCEDE DE LAS CALORÍAS DIARIAS PREVISTAS, EN AMARILLO SI 
ESTÁ < 10% Y EN VERDE CUANDO ESTÉ POR DEBAJO-->

  GET OBTENER REGISTRO
curl --location -g '{{calcount}}/registros.php?idUsuario=7' \
--header 'Content-Type: application/json' \
--header 'apikey: e827ae9286583d79f71670c31c992531' \
--header 'iduser: 7'
*/
