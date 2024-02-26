import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarCalorias } from '../features/caloriasSlice';

const CaloriasTotales = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);
    const cantCalorias = useSelector(state => state.calorias.cantidadCalorias);

    const dispatch = useDispatch();

    const caloriasxid = (id) => {
        for (let i = 0; i < alimentos.length; i++) {
            if (alimentos[i].id == id) {
                return alimentos[i].calorias;
            }
        }
        return 0; // Retorna 0 si no se encuentra el alimento con el ID dado
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


    useEffect(() => {
        let calTotales = 0;
        for (let i = 0; i < registros.length; i++) {
            const registro = registros[i];
            const alimentoId = registro.idAlimento;
            let cantidadUnidades = 0;

            //Si es "u" no se va a dividir entre 100, sino sí.
            if (proporcionAlimentoXId(alimentoId) != "u") {
                cantidadUnidades = registro.cantidad / 100;
            }
            else {
                cantidadUnidades = registro.cantidad;
            }
            calTotales += caloriasxid(alimentoId) * cantidadUnidades;
        }
        dispatch(guardarCalorias(calTotales));
    }, [registros]);



    return (
        <div className="row align-items-center">
            <div className="col">
                <h2>Calorias totales:</h2>
            </div>
            <div className="col">
                <h3>{cantCalorias}</h3>
            </div>
        </div>
    )
}

export default CaloriasTotales;
