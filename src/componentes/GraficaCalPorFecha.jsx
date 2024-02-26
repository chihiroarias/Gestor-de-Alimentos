import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const GraficaCalPorFecha = () => {
  const registros = useSelector(state => state.registros.registrosLista);
  const alimentos = useSelector(state => state.alimentos.listAlimentos);
  const [caloriasPorFecha, setCaloriasPorFecha] = useState({});

  const caloriasxid = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id == id);
    return alimentoEncontrado ? alimentoEncontrado.calorias : 0;
  };

  const proporcionAlimentoXId = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id == id);

    if (alimentoEncontrado) {
      const porcion = alimentoEncontrado.porcion;

      // Utilizar una expresión regular para extraer la unidad de medida
      const proporcionRegex = /[a-zA-Z]+/g;
      const proporcionMatch = porcion.match(proporcionRegex);

      if (proporcionMatch && proporcionMatch.length > 0) {
        const proporcion = proporcionMatch[0];
        return proporcion.toLowerCase();
      }
    } else {
      return null;
    }
  };

  const calcularCaloriasPorFecha = () => {
    const caloriasPorFechaCalculadas = {};

    registros.forEach(registro => {
      const { fecha, idAlimento, cantidad } = registro;
      const fechaKey = fecha.split('T')[0]; // Formato YYYY-MM-DD

      const caloriasAlimento = caloriasxid(idAlimento);
      let cantidadUnidades = 0;

      //Si es "u" no se va a dividir entre 100, sino sí.
      if (proporcionAlimentoXId(idAlimento) !== "u") {
        cantidadUnidades = registro.cantidad / 100;
      } else {
        cantidadUnidades = registro.cantidad;
      }
      const caloriasConsumidas = caloriasAlimento * cantidadUnidades;

      if (caloriasPorFechaCalculadas[fechaKey]) {
        caloriasPorFechaCalculadas[fechaKey] += caloriasConsumidas;
      } else {
        caloriasPorFechaCalculadas[fechaKey] = caloriasConsumidas;
      }
    });

    setCaloriasPorFecha(caloriasPorFechaCalculadas);
  };

  useEffect(() => {
    calcularCaloriasPorFecha();
  }, [registros]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calorías por Fecha',
      },
    },
  };

  const fechas = Object.keys(caloriasPorFecha);
  const calorías = Object.values(caloriasPorFecha);

  const data = {
    labels: fechas,
    datasets: [
      {
        label: 'Calorías Consumidas',
        data: calorías,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de Calorías por Fecha</h2>
      <div>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default GraficaCalPorFecha;
