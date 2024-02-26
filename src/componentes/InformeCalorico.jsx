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
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center">
          <CaloriasTotales />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <CaloriasDiarias />
        </div>
      </div>
    </div>
  )
}

export default InformeCalorico


