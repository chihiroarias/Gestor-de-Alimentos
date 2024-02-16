import React from 'react'

let url = "https://calcount.develotion.com/";

const Analisis = () => {
  return (
    <div className="Analisis-graficos">
      <h1>Análisis</h1>

      <div className="Grafico-CantPorAlimento">
        <h2>GRÁFICO DE CANTIDADES POR ALIMENTO</h2>
      </div>

      <div className="Grafico-CaloriasPorFecha">
        <h2>GRÁFICO DE CALORÍAS POR FECHA-</h2>
      </div>

      <div className="Grafico-UsuariosPorPais">
        <h2>MAPA DE USUARIOS POR PAÍS</h2>
      </div>

      <div className="Grafico-NuevaMeta">
        <h2>TIEMPO RESTANTE PARA DEFINIR NUEVOS OBJ</h2>
      </div>
    </div>
  )
}
////Grafico cantidad alimentos////
////Grafico de calorias por fecha////
////Mapa de usuarios por pais////
////Tiempo restante para definir nuevos objetivos////

export default Analisis



/*
  GET PERSONAS POR PAIS
curl --location -g '{{calcount}}/usuariosPorPais.php' \
--header 'Content-Type: application/json' \
--header 'apikey: ab73734f68ef0184de707643707e7950' \
--header 'iduser: 7'

*/