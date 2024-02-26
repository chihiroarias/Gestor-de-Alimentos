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

export default GraficaCantPorAlimento;