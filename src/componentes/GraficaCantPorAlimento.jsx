import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficaCantPorAlimento = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);

    // State para almacenar los datos de la gráfica
    const [datosGrafica, setDatosGrafica] = useState([]);

    // Función para calcular la cantidad consumida de cada alimento
    useEffect(() => {
        // Calcular la cantidad de veces que se consumió cada alimento
        const contadorAlimentos = {};
        registros.forEach(registro => {
            const idAlimento = registro.idAlimento;
            contadorAlimentos[idAlimento] = (contadorAlimentos[idAlimento] || 0) + 1;
        });

        // Convertir el contador en un array de objetos {idAlimento, CantConsumido}
        const datosGraficos = Object.keys(contadorAlimentos).map(idAlimento => ({
            idAlimento,
            CantConsumido: contadorAlimentos[idAlimento]
        }));

        // Actualizar el estado local con los datos para la gráfica
        setDatosGrafica(datosGraficos);
    }, [registros]);

    // Configuración de los colores de fondo y borde
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];

    const labels = datosGrafica.map(dato => `Alimento ID: ${dato.idAlimento}`);
    const data = datosGrafica.map(dato => dato.CantConsumido);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: 'Veces consumido',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={dataChart} />;
};

export default GraficaCantPorAlimento


/* CODIGO PRIMERA VERSION

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const GraficaCantPorAlimento = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const [datosGrafica, setDatosGrafica] = useState([]);

    useEffect(() => {
        // Calcular la cantidad de veces que se consumió cada alimento
        const contadorAlimentos = {};
        registros.forEach(registro => {
            const idAlimento = registro.idAlimento;
            contadorAlimentos[idAlimento] = (contadorAlimentos[idAlimento] || 0) + 1;
        });

        // Convertir el contador en un array de objetos {idAlimento, CantConsumido}
        const datosGraficos = Object.keys(contadorAlimentos).map(idAlimento => ({
            idAlimento,
            CantConsumido: contadorAlimentos[idAlimento]
        }));

        // Actualizar el estado local con los datos para la gráfica
        setDatosGrafica(datosGraficos);
    }, [registros]);

    // Aquí renderizarías tu gráfica con los datos en datosGrafica

    return (
        <div>
            <h2>Datos para la gráfica:</h2>
            <ul>
                {datosGrafica.map(dato => (
                    <li key={dato.idAlimento}>
                        Alimento ID: {dato.idAlimento} | Cantidad Consumida: {dato.CantConsumido}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GraficaCantPorAlimento

*/




/* GRAFICA SEGUNDA VERSION, NO SE RENDERIZA AUTOM.

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficaCantPorAlimento = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);

    // State para almacenar los datos de la gráfica
    const [datosGrafica, setDatosGrafica] = useState([]);

    // Función para calcular la cantidad consumida de cada alimento
    useEffect(() => {
        const calcularCantidadConsumida = () => {
            const datos = [];

            // Recorrer los alimentos y contar la cantidad de veces que se consumió cada uno
            alimentos.forEach(alimento => {
                const cantConsumido = registros.filter(registro => registro.idAlimento === alimento.id).length;
                datos.push({ idAlimento: alimento.id, CantConsumido: cantConsumido });
            });

            // Filtrar los alimentos que no tienen registros
            const datosFiltrados = datos.filter(dato => dato.CantConsumido > 0);

            setDatosGrafica(datosFiltrados);
        };

        calcularCantidadConsumida();
    }, [registros]);

    // Configuración de los colores de fondo y borde
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];

    const labels = datosGrafica.map(dato => `Alimento ID: ${dato.idAlimento}`);
    const data = datosGrafica.map(dato => dato.CantConsumido);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: 'Veces consumido',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={dataChart} />;
};

export default GraficaCantPorAlimento

*/



/* VERSION FINAL FUNCIONAAAA, SE RENDERIZA EN TIEMPO REAL.


import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficaCantPorAlimento = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);

    // State para almacenar los datos de la gráfica
    const [datosGrafica, setDatosGrafica] = useState([]);

    // Función para calcular la cantidad consumida de cada alimento
    useEffect(() => {
        // Calcular la cantidad de veces que se consumió cada alimento
        const contadorAlimentos = {};
        registros.forEach(registro => {
            const idAlimento = registro.idAlimento;
            contadorAlimentos[idAlimento] = (contadorAlimentos[idAlimento] || 0) + 1;
        });

        // Convertir el contador en un array de objetos {idAlimento, CantConsumido}
        const datosGraficos = Object.keys(contadorAlimentos).map(idAlimento => ({
            idAlimento,
            CantConsumido: contadorAlimentos[idAlimento]
        }));

        // Actualizar el estado local con los datos para la gráfica
        setDatosGrafica(datosGraficos);
    }, [registros]);

    // Configuración de los colores de fondo y borde
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];

    const labels = datosGrafica.map(dato => `Alimento ID: ${dato.idAlimento}`);
    const data = datosGrafica.map(dato => dato.CantConsumido);

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: 'Veces consumido',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={dataChart} />;
};

export default GraficaCantPorAlimento

*/