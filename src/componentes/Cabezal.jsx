import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Cabezal = () => {

    const navigate = useNavigate();
    const Logout = () => { 
        localStorage.clear(); 
        navigate("/");
    }
  return (

    <div>
        <header>    
      
            <input type="button" value="LOGOUT" onClick={Logout} />
            <br/>
            <NavLink to="/Listado" className="button">| Listado |</NavLink> 
            <NavLink to="/Informe"> Informes </NavLink>
            <NavLink to="/Analisis">| Análisis |</NavLink>
            <br/>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  
  )
}

export default Cabezal