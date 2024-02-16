import React from 'react'
import InformeCalorico from './InformeCalorico'
import Listado from './Listado'
import AgregarRegistro from './AgregarRegistro'
import Analisis from './Analisis'
const Dashboard = () => {

    const Logout = () => { localStorage.clear() }

    return (
        <>
            <input type="button" value="LOGOUT" onClick={Logout} />

            <Analisis />

            <InformeCalorico />

            <Listado />

            <AgregarRegistro />
        </>

    )
}

export default Dashboard