import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { guardarRegistros } from "../features/registrosSlice";
import { useDispatch, useSelector } from 'react-redux';
import RegistroComida from "./RegistroComida";

const Listado = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const registrosEncontrados = useSelector(state => state.registros.registrosLista);
  let iduser = localStorage.getItem("IDLogueado");
  let key = localStorage.getItem("TokenLogueado");

  useEffect(() => {
    if (localStorage.getItem("IDLogueado") != null) {
      fetch(`https://calcount.develotion.com/registros.php?idUsuario=${iduser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': key,
          'iduser': iduser
        }
      })
        .then(response => response.json())
        .then(datos => {
          console.log(datos);
          dispatch(guardarRegistros(datos.registros));
        })
        .catch(error => {
          console.error('Error al obtener registros:', error);
        });
    } else {
      navigate("/");
    }
  }, [])




  return (
    <div className="Listado-Registros">
      Registros:
      {registrosEncontrados.map(reg => (
        <RegistroComida key={reg.id} {...reg}/>
      ))}
    </div>

  )
}
export default Listado





/*
  GET OBTENER REGISTRO
curl --location -g '{{calcount}}/registros.php?idUsuario=7' \
--header 'Content-Type: application/json' \
--header 'apikey: e827ae9286583d79f71670c31c992531' \
--header 'iduser: 7'
*/



/*
  DELETE REGISTRO DE COMIDA
curl --location -g --request DELETE '{{calcount}}/registros.php?idRegistro=3' \
--header 'Content-Type: application/json' \
--header 'apikey: f8258457d51b60027c7b6765935caba7' \
--header 'iduser: 7'
*/



/*
 
<div className="Listado-Registros">
      <div className="image"></div>
 
      <div className="busacarxFcha">
        <label htmlFor="btnBuscar">Buscar por fecha</label>
        <input type="date" id="btnBuscar" />
 
        <input type="button" id="buscarFch" value="BUSCAR" />
      </div>
 
    </div>
 
*/



/*
<div className="Listado-Registros">
      <div className="image"></div>

      <div className="busacarxFcha">
        <label htmlFor="btnBuscar">Buscar por fecha</label>
        <input type="date" id="btnBuscar" />

        <input type="button" id="buscarFch" value="BUSCAR" />
      </div>

    </div>
*/