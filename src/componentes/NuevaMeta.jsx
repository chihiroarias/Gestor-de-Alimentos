import React, { useState, useEffect } from 'react';

const NuevaMeta = () => {
    const [diasFaltantes, setDiasFaltantes] = useState(0);

    useEffect(() => {
        // Obtiene la fecha actual
        const fechaActual = new Date();

        // 31 - 2
        const fechaMeta = new Date(fechaActual.getFullYear(), 2, 31);

        // Agarrar cuantos milisegundos hay entre ambas fechas.
        const diferencia = fechaMeta.getTime() - fechaActual.getTime();

        // Convertirde milisegundos a dias.
        const cantDias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
        setDiasFaltantes(cantDias);
    }, []);

    return (
        <div className="text-center bg-dark text-white">
            <h2>Nueva meta</h2>
            <p className="mb-0">Faltan {diasFaltantes} días para el 31 de marzo.</p>
        </div>
    );
};

export default NuevaMeta;