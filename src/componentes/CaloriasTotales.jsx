import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarCalorias } from '../features/caloriasSlice';

const CaloriasTotales = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);
    const cantCalorias = useSelector(state=> state.calorias.cantidadCalorias);

    const dispatch = useDispatch(); 

    const caloriasxid = (id) => {
        const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
        return alimentoEncontrado ? alimentoEncontrado.calorias : 0;
    };


    const proporcionAlimentoXId = (id) => {
        const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
    
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
            if(proporcionAlimentoXId(alimentoId) != "u"){
                cantidadUnidades = registro.cantidad / 100;
            }
            else{
                cantidadUnidades = registro.cantidad;
            }
            calTotales += caloriasxid(alimentoId) * cantidadUnidades;
        }
        dispatch(guardarCalorias(calTotales));
    }, [registros]);

    

    return (
        <div>
            <h3>{cantCalorias}</h3>
        </div>
    )
}

export default CaloriasTotales;

/*
useEffect(() => {
        let calTotales = 0;
        for (let i = 0; i < registros.length; i++) {
            const registro = registros[i];
            const alimentoId = registro.idAlimento;
            let cantidadUnidades = 0;

            //Si es "u" no se va a dividir entre 100, sino sí.
            if(proporcionAlimentoXId(alimentoId) != "u"){
                cantidadUnidades = registro.cantidad / 100;
            }
            else{
                cantidadUnidades = registro.cantidad;
            }
            calTotales += caloriasxid(alimentoId) * cantidadUnidades;
        }
        dispatch(guardarCalorias(calTotales));
    }, [registros]);













        // Calculamos las calorías totales sumando las calorías de cada registro
        const totalCalorias = registros.reduce((total, registro) => {
            const caloriasPorPorcion = caloriasxid(registro.idAlimento);
            let cantidadUnidades = 0;
            //Si es "u" no se va a dividir entre 100, sino sí.
            if(proporcionAlimentoXId(registro.idAlimento) != "u"){
                cantidadUnidades = registro.cantidad / 100;
            }
            else{
                cantidadUnidades = registro.cantidad;
            }
            return total + (caloriasPorPorcion * cantidadUnidades);
        }, 0);

        dispatch(guardarCalorias(totalCalorias));



*/