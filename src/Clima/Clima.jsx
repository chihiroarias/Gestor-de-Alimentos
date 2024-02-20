import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Clima = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(()=>{
        if(localStorage.getItem("IDLogueado")===null){
            navigate("/")
        }else{
            fetch("https://api.open-meteo.com/v1/forecast?latitude=-34.9033&longitude=-56.1882&daily=temperature_2m_max%2Ctemperature_2m_min&timezone=auto")
            .then(r=>r.json())
            .then(datos=>{
                console.log(datos);
                //dispatch(guardarTemperaturas());
            })
        }

    }, []);

  return (
    <div>Clima</div>
  )
}

export default Clima
//https://api.open-meteo.com/v1/forecast?latitude=-34.9033&longitude=-56.1882&daily=temperature_2m_max%2Ctemperature_2m_min&timezone=auto