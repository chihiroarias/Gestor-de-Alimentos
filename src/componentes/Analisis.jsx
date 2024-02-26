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


export default Analisis

