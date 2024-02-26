import React, { useEffect, useRef, useState } from 'react'
import { guardarAlimentos } from "../features/alimentosSlice";
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { guardarUnRegistro } from '../features/registrosSlice';



const AgregarRegistro = () => {
  let url = "https://calcount.develotion.com/";

  let token = localStorage.getItem("TokenLogueado");
  let id = localStorage.getItem("IDLogueado");

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
    fetch(url + '/alimentos.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "apikey": token,
        "iduser": id
      }
    })
      .then(r => r.json())
      .then(datos => {
        dispatch(guardarAlimentos(datos.alimentos));
      })
  }, []);

  const obtenerFechaHoy = () => {
    let fchaDeHoy = new Date();
    let año = fchaDeHoy.getFullYear();
    let mes = fchaDeHoy.getMonth() + 1;
    mes = mes < 10 ? '0' + mes : mes;
    let dia = fchaDeHoy.getDate();
    dia = dia < 10 ? '0' + dia : dia;
    let fechaCorta = `${año}-${mes}-${dia}`;
    return fechaCorta;
  }

  const obtenerFechaAyer = () => {
    let fechaDeAyer = new Date();
    let añoAyer = fechaDeAyer.getFullYear();
    let mesAyer = fechaDeAyer.getMonth() + 1;
    mesAyer = mesAyer < 10 ? '0' + mesAyer : mesAyer;
    let diaAyer = fechaDeAyer.getDate();
    diaAyer = diaAyer < 10 ? '0' + diaAyer : diaAyer;
    let diaAyerMenos = fechaDeAyer.getDate() - 1;
    let fechaCortaAyer = `${añoAyer}-${mesAyer}-${diaAyerMenos}`;
    return fechaCortaAyer;
  }


  const Registrar = () => {

    const tok = localStorage.getItem("TokenLogueado");
    const idus = localStorage.getItem("IDLogueado");

    const alimento = slcAlimentos.current.value;
    const cantidad = cantCalorias.current.value;
    const fecha = fcha.current.value;

    let fchaDeHoy = obtenerFechaHoy();
    let fechaDeAyer = obtenerFechaAyer();

    if (cantidad > 0 && fecha == fchaDeHoy || fecha == fechaDeAyer) {
      let cantidadTotal = alimentosLista.find(a => a.id == alimento);
      let convert = cantidadTotal.porcion.replace(/[^0-9.]/g, '');
      let cantidadParseada = parseInt(convert);

      const obj = {
        id: 0,
        idAlimento: alimento,
        idUsuario: idus,
        cantidad: cantidadParseada * cantidad,
        fecha: fecha
      }

      fetch(url + '/registros.php', {
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
        .then(r => r.json())
        .then(datos => {

          obj.id = datos.idRegistro;
          dispatch(guardarUnRegistro(obj));
        })
        .catch(error => {
          alert(error.message);
          setMensaje("Credenciales no válidas");
        });

    } else {
      setMensaje("Datos incorrectos");
    }
  }

  return (

    <div className="container">
      <div className="row mb-3">
        <label htmlFor="selectAlimentos" className="col-sm-2 col-form-label">Seleccionar alimento:</label>
        <div className="col-sm-10">
          <select id="selectAlimentos" className="form-select" ref={slcAlimentos}>
            {alimentosLista.map(alimento => (
              <option key={alimento.id} value={alimento.id}>{alimento.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="inputCantidad" className="col-sm-2 col-form-label">Cantidad:</label>
        <div className="col-sm-10">
          <input type="number" id="inputCantidad" className="form-control" ref={cantCalorias} />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="inputFecha" className="col-sm-2 col-form-label">Fecha:</label>
        <div className="col-sm-10">
          <input type="date" id="inputFecha" className="form-control" ref={fcha} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary" onClick={Registrar}>REGISTRAR</button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <article>
            <p>{mensaje}</p>
          </article>
        </div>
      </div>
    </div>


  )
}

export default AgregarRegistro 