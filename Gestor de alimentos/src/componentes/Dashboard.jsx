import React from 'react'
import InformeCalorico from './InformeCalorico'
import Listado from './Listado'
import AgregarRegistro from './AgregarRegistro'
import Cabezal from './Cabezal'
import Mapa from './Mapa'
import NuevaMeta from './NuevaMeta'
import GraficaCantPorAlimento from './GraficaCantPorAlimento'
import GraficaCalPorFecha from './GraficaCalPorFecha'
const Dashboard = () => {

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Cabezal />
                        <hr />
                    </div>
                </div>
                <div className='row mt-auto'>
                    <div className='col'>
                        <NuevaMeta />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <InformeCalorico />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 align-items-center'>
                        <AgregarRegistro />
                        <hr />
                    </div>
                    <div className='col-md-6'>
                        <Listado />
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <GraficaCantPorAlimento />
                    </div>
                    <div className="col-md-6">
                        <GraficaCalPorFecha />
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <Mapa />
                    </div>
                </div>
                

            </div>
        </>

    )
}

export default Dashboard
