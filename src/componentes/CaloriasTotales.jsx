import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarCalorias } from '../features/caloriasSlice';

const CaloriasTotales = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);
    const cantCalorias = useSelector(state => state.calorias.cantidadCalorias);

    const dispatch = useDispatch();

    // const caloriasxid = (id) => {
    //     const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
    //     console.log("Id: ");
    //     console.log(id);
    //     return alimentoEncontrado ? alimentoEncontrado.calorias : 0;
    // };


    const caloriasxid = (id) => {
        for (let i = 0; i < alimentos.length; i++) {
            if (alimentos[i].id === id) {
                console.log("Id: ", id);
                return alimentos[i].calorias;
            }
        }
        return 0; // Retorna 0 si no se encuentra el alimento con el ID dado
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



    // useEffect(() => {
    //     // Calculamos las calorías totales sumando las calorías de cada registro
    //     const totalCalorias = registros.reduce((total, registro) => {
    //         const caloriasPorPorcion = caloriasxid(registro.idAlimento);
    //         let cantidadUnidades = 0;
    //         //Si es "u" no se va a dividir entre 100, sino sí.
    //         if(proporcionAlimentoXId(registro.idAlimento) != "u"){
    //             cantidadUnidades = registro.cantidad / 100;
    //         }
    //         else{
    //             cantidadUnidades = registro.cantidad;
    //         }
    //         // Sumamos las calorías del registro actual
    //         return total + (caloriasPorPorcion * cantidadUnidades);
    //     }, 0);

    //     dispatch(guardarCalorias(totalCalorias));
    //     console.log('Total de calorías:', totalCalorias);
    // }, [registros]); // Ejecutar cuando hay cambios en los registros o alimentos



    useEffect(() => {
        //console.log("[CaloriasTotales, useEffect] Cantidad de calorias del useSelector al principio: " + cantCalorias);
        //console.log("Esto se esta ejecutando");
        let calTotales = 0;
        for (let i = 0; i < registros.length; i++) {
            const registro = registros[i];
            console.log("Registro: ");
            console.log(registro);
            const alimentoId = registro.idAlimento;
            let cantidadUnidades = 0;

            //Si es "u" no se va a dividir entre 100, sino sí.
            if (proporcionAlimentoXId(alimentoId) != "u") {
                cantidadUnidades = registro.cantidad / 100;
                //console.log(proporcionAlimentoXId(alimentoId));
            }
            else {
                cantidadUnidades = registro.cantidad;
            }
            calTotales += caloriasxid(alimentoId) * cantidadUnidades;
            //console.log("[CaloriasTotales, useEffect] Calorias calculadas antes de salir del for: " + calTotales);
        }
        //console.log("[CaloriasTotales, useEffect] Calorias calculadas luego de salir del for: " + calTotales);
        dispatch(guardarCalorias(calTotales));
        //console.log("[CaloriasTotales, useEffect] Cantidad de calorias del useSelector al final: " + cantCalorias);
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





    useEffect(() => {
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
            // Sumamos las calorías del registro actual
            return total + (caloriasPorPorcion * cantidadUnidades);
        }, 0);

        dispatch(guardarCalorias(totalCalorias));
        console.log('Total de calorías:', totalCalorias);
    }, [registros]); // Ejecutar cuando hay cambios en los registros o alimentos








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












useEffect(() => {
        //console.log("[CaloriasTotales, useEffect] Cantidad de calorias del useSelector al principio: " + cantCalorias);
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
            //console.log("[CaloriasTotales, useEffect] Calorias calculadas antes de salir del for: " + calTotales);
        }
        //console.log("[CaloriasTotales, useEffect] Calorias calculadas luego de salir del for: " + calTotales);
        dispatch(guardarCalorias(calTotales));
        //console.log("[CaloriasTotales, useEffect] Cantidad de calorias del useSelector al final: " + cantCalorias);
    }, [registros]);



*/