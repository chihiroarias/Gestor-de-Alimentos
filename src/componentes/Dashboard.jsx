import React from 'react'

import InformeCalorico from './InformeCalorico'
import Listado from './Listado'
import AgregarRegistro from './AgregarRegistro'
import Analisis from './Analisis'
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

/*
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
 <Routes>
                    <Route path="/" element={<Cabezal/>}></Route>
                        <Route path="/s" element={<AgregarRegistro />}/>
                        <Route path="/Listado" element={   <Listado />}/>
                        <Route path="/Informe" element={<InformeCalorico />}/>
                        <Route path="/Analisis" element={<Analisis />}/>
                        <Route path="*" element={<NotFound/>}/>
                </Routes>

*/


/* ANTERIOR

<div className='Contenedor'>
                <div className='Container'>
                    <Cabezal />
                    <hr />

                </div>
                <div className='Container'>
                    <AgregarRegistro />
                    <hr />
                </div>
                <div className='Container'>
                    <Listado />
                    <hr />
                </div>
                <div className='Container'>
                    <InformeCalorico />
                </div>
                <div className='Container'>
                    <Mapa />
                </div>
                <div className='Container'>
                    <NuevaMeta />
                </div>
                <div className='Container'>
                    <GraficaCantPorAlimento />
                </div>
                <div className='Container'>
                    <GraficaCalPorFecha />
                </div>
            </div>
*/



/* Con diseño preliminar

<div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Cabezal />
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <AgregarRegistro />
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Listado />
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <InformeCalorico />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Mapa />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <NuevaMeta />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <GraficaCantPorAlimento />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <GraficaCalPorFecha />
                    </div>
                </div>
            </div>
*/