import React from 'react'
import { useSelector } from 'react-redux';
import CaloriasDiarias from './CaloriasDiarias';
import CaloriasTotales from './CaloriasTotales';

let url = "https://calcount.develotion.com/";

const InformeCalorico = () => {
  
  let iduser = localStorage.getItem("IDLogueado");
  let key = localStorage.getItem("TokenLogueado");

  return (
    <div className="informe-calorico">
      <h3>Calorias totales</h3>
        <CaloriasTotales/>
      <h3>Calorias diarias</h3>
      <div>
        <CaloriasDiarias/>
      </div>
    </div>
  )
}

export default InformeCalorico

