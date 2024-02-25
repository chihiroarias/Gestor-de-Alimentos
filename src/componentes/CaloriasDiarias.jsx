import React from 'react'
import { guardarCaloriasDiarias } from '../features/caloriasSlice'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CaloriasDiarias = () => {
  const registros = useSelector(state => state.registros.registrosLista);
  const alimentos = useSelector(state => state.alimentos.listAlimentos);
  const cantCaloriasDiarias = useSelector(state => state.calorias.cantidadDiaria);

  const cantCaloriasUsuario = localStorage.getItem("CaloriasDiariasLogueado");

  const [color, setColor] = useState('');


  const dispatch = useDispatch();

  const caloriasxid = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
    return alimentoEncontrado ? alimentoEncontrado.calorias : 0;
  };


  const proporcionAlimentoXId = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);

    if (alimentoEncontrado) {
      const porcion = alimentoEncontrado.porcion;

      // Utilizar una expresión regular para extraer la unidad de medida
      const proporcionRegex = /[a-zA-Z]+/g;
      const proporcionMatch = porcion.match(proporcionRegex);

      if (proporcionMatch && proporcionMatch.length > 0) {
        const proporcion = proporcionMatch[0];
        return proporcion.toLowerCase();
      }
    } else {
      return null;
    }
  };


  function esFechaHoy(fechaStr) {

    const fechaActual = new Date();
    const year = fechaActual.getUTCFullYear();
    const month = fechaActual.getUTCMonth() + 1;
    const day = fechaActual.getDate();

    const fechaISO = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    var fecha = new Date(fechaStr);
    var fechaStrS = fecha.toISOString().slice(0, 10);

    return fechaStrS === fechaISO;
  }

  useEffect(() => {
    let calTotales = 0;
    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      if (esFechaHoy(registro.fecha)) {


        const alimentoId = registro.idAlimento;
        let cantidadUnidades = 0;

        //Si es "u" no se va a dividir entre 100, sino sí.
        if (proporcionAlimentoXId(alimentoId) != "u") {
          cantidadUnidades = registro.cantidad / 100;
        }
        else {
          cantidadUnidades = registro.cantidad;
        }
        calTotales += caloriasxid(alimentoId) * cantidadUnidades;
      }
    }
    dispatch(guardarCaloriasDiarias(calTotales));

    // Calcular la diferencia entre la cantidad de calorías consumidas y la cantidad máxima permitida
    const diferencia = cantCaloriasUsuario - calTotales;

    // Asignar color según la diferencia
    if (diferencia < 0) {
      setColor('red'); // Excede la cantidad diaria permitida
    } else if (diferencia <= cantCaloriasUsuario * 0.1) {
      setColor('yellow'); // Está por debajo hasta un 10%
    } else {
      setColor('green'); // Está por debajo
    }

  }, [registros]);





  return (
    <div style={{ color: color }}>Calorias Diarias: {cantCaloriasDiarias}</div>
  )
}

export default CaloriasDiarias

/*Calorías diarias: en otro componente mostrar la cantidad de
calorías registradas en el día. El dato se mostrará en rojo si
excede la cantidad total de calorías diarias prevista en el
registro, en amarillo si está por debajo hasta un 10% y en
verde cuando esté por debajo. */

/*
const CaloriasDiarias = () => {
  const registros = useSelector(state => state.registros.registrosLista);
  const alimentos = useSelector(state => state.alimentos.listAlimentos);
  const cantCaloriasDiarias = useSelector(state => state.calorias.cantidadDiaria);

  const cantCaloriasUsuario = localStorage.getItem("CaloriasDiariasLogueado");

  const dispatch = useDispatch();

  const caloriasxid = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
    return alimentoEncontrado ? alimentoEncontrado.calorias : 0;
  };


  const proporcionAlimentoXId = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);

    if (alimentoEncontrado) {
      const porcion = alimentoEncontrado.porcion;

      // Utilizar una expresión regular para extraer la unidad de medida
      const proporcionRegex = /[a-zA-Z]+/g;
      const proporcionMatch = porcion.match(proporcionRegex);

      if (proporcionMatch && proporcionMatch.length > 0) {
        const proporcion = proporcionMatch[0];
        return proporcion.toLowerCase();
      }
    } else {
      return null;
    }
  };


  function esFechaHoy(fechaStr) {
    var fecha = new Date(fechaStr);
    var fechaActual = new Date();
    var fechaActualStr = fechaActual.toISOString().slice(0, 10); // Formato "año-mes-día"
    var fechaStr = fecha.toISOString().slice(0, 10);

    console.log("En esFechaHoy, fecha date por str: " + fecha);
    console.log("En esFechaHoy, fecha date now: " + fechaActual);
    console.log("En esFechaHoy, fecha actual trans: " + fechaActualStr);
    console.log("En esFechaHoy, fecha pasada trans: " + fechaStr);

    return fechaStr === fechaActualStr;
}
    
    
  useEffect(() => {
    let calTotales = 0;
    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      console.log("-----------------------------------");
      console.log("En useEffect, la fecha: " + registro.fecha);
      if (esFechaHoy(registro.fecha)) {

        const alimentoId = registro.idAlimento;
        let cantidadUnidades = 0;

        //Si es "u" no se va a dividir entre 100, sino sí.
        if (proporcionAlimentoXId(alimentoId) != "u") {
          cantidadUnidades = registro.cantidad / 100;
        }
        else {
          cantidadUnidades = registro.cantidad;
        }
        calTotales += caloriasxid(alimentoId) * cantidadUnidades;
      }
    }
    dispatch(guardarCaloriasDiarias(calTotales));
  }, [registros]);





  return (
    <div>CaloriasDiarias: 
      <br/>
      {cantCaloriasDiarias}
    </div>
  )
}

export default CaloriasDiarias
*/


/*
HOY ES 24/2 Y ME TIRA QUE ES 25/2, ES POR LA ZONA HORARIA

function esFechaHoy(fechaStr) {
    var fecha = new Date(fechaStr);
    var fechaActual = new Date();
    var fechaActualStr = fechaActual.toISOString().slice(0, 10); // Formato "año-mes-día"
    var fechaStr = fecha.toISOString().slice(0, 10);

    console.log(fechaActual);
    console.log("Fecha actual str: " + fechaActualStr);
    console.log("Fecha str: " + fechaStr);
    console.log(fechaActualStr + " | " + fechaStr);
    return fechaStr === fechaActualStr;
  }

*/