import React from 'react'

import InformeCalorico from './InformeCalorico'
import Listado from './Listado'
import AgregarRegistro from './AgregarRegistro'
import Analisis from './Analisis'
import { Route } from 'react-router/cjs/react-router.min'
const Dashboard = () => {

    const Logout = () => { localStorage.clear(); }

    return (
        <>
            <input type="button" value="LOGOUT" onClick={Logout} />
            <AgregarRegistro />
        </>

    )
}

export default Dashboard

//import { NavLink, Outlet } from "react-router-dom"
/*   <nav>
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/Analisis">Analisis</NavLink>
                <NavLink to="/InformeCalorico">Informes Calóricos</NavLink>
                <NavLink to="/Listado">Listados</NavLink>
                <NavLink to="/AgregarRegistro">Agregar un Registro</NavLink>
                </nav>

            <Route path="/Analisis">
                <Analisis />
            </Route>
            <Route path="/InformeCalorico">
                <InformeCalorico />
            </Route>
            
            <Route path="/Listado">
                <Listado />

            </Route>

            <Route path="/AgregarRegistro">
               

            </Route>
             */