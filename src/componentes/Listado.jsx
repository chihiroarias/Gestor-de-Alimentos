import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { guardarRegistros } from "../features/registrosSlice";
import { useDispatch, useSelector } from 'react-redux';
import RegistroComida from "./RegistroComida";
import { guardarImagenes } from "../features/imagenesSlice";

const Listado = () => {
  const navigate = useNavigate();

  const slcFiltro = useRef(null);
  const dispatch = useDispatch();

  const registrosEncontrados = useSelector(state => state.registros.registrosLista);
  const alimentos = useSelector(state => state.alimentos.listAlimentos);

  let iduser = localStorage.getItem("IDLogueado");
  let key = localStorage.getItem("TokenLogueado");

  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);

  //const imag = useSelector(state => state.imgs.imagenes);

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
          dispatch(guardarRegistros(datos.registros));
        })
        .catch(error => {
          alert("error: " + error);
        });
    } else {
      navigate("/");
    }



    // console.log("Imagenes antes: ");
    // console.log(imag);
    // const obtenerRutasImagenes = (AllAlimentos) => {
    //   console.log("alimentos:");
    //   console.log(AllAlimentos);


    //   const rutasImagenes = AllAlimentos.map(alimento => {
    //       const idImagen = alimento.imagen; // Suponiendo que la propiedad que contiene el ID de la imagen se llama "imagen"
    //       const rutaImagen = `https://calcount.develotion.com/imgs/${idImagen}.png`;
    //       return { idAlimento: alimento.id, rutaImagen: rutaImagen };
    //   });
  
    //   console.log("lo que contiene rutasImagenes: ");
    //   console.log(rutasImagenes);
    //   return rutasImagenes;
    // };

    // dispatcher(guardarImagenes(obtenerRutasImagenes(alimentos)))
    // console.log("Imagenes despues: ");
    // console.log(imag);




  }, [])


  // useEffect(() => {
  //   console.log("Imagenes antes: ");
  //   console.log(imag);
  //   const obtenerRutasImagenes = (AllAlimentos) => {
  //     const rutasImagenes = AllAlimentos.map(alimento => {
  //         const idImagen = alimento.imagen; // Suponiendo que la propiedad que contiene el ID de la imagen se llama "imagen"
  //         const rutaImagen = `https://calcount.develotion.com/imgs/${idImagen}.png`;
  //         return { idAlimento: alimento.id, rutaImagen: rutaImagen };
  //     });
  
  //     return rutasImagenes;
  //   };

  //   dispatch(guardarImagenes(obtenerRutasImagenes(alimentos)))
  //   console.log("Imagenes despues: ");
  //   console.log(imag);
  // }, [])


  useEffect(() => {
    setRegistrosFiltrados(registrosEncontrados); // Actualizar los registros filtrados cuando cambien los registros encontrados
  }, [registrosEncontrados]);


  const Filtro = () => {
    let consulta = slcFiltro.current.value;

    let semana = new Date();
    let fechaActual = new Date();
    let mesActual = fechaActual.getMonth();

    switch (consulta) {
      case "Semanal":
        semana.setDate(fechaActual.getDate() - 7);
        setRegistrosFiltrados(registrosEncontrados.filter(reg => new Date(reg.fecha) > semana));
        break;
      case "Mensual":
        setRegistrosFiltrados(registrosEncontrados.filter(reg=>{
          let fchRegistro= new Date(reg.fecha);
          return fchRegistro.getMonth() === mesActual;
        }));
        break;
      case "General":
        setRegistrosFiltrados(registrosEncontrados);
        break;
      default:
        setRegistrosFiltrados(registrosEncontrados);
    }

  }


  return (
    <div className="Listado-Registros">
      Registros:
      {registrosFiltrados.map(reg => (
        <RegistroComida key={reg.id} {...reg} />
      ))}

      <label htmlFor="slcFiltro">Buscar por fecha</label>
      <select className="slcFiltro" ref={slcFiltro}>
        <option value="Semanal">Semanal</option>
        <option value="Mensual">Mensual</option>
        <option value="General">General</option>
      </select>
      <input type="button" value="BUSCAR" onClick={Filtro}></input>
    </div>

  )
}
export default Listado