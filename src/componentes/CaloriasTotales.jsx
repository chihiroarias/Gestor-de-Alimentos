import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const CaloriasTotales = () => {
    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);

    const [calTotal, setCalTotal] = useState(0);

    const caloriasxid = (id) => {
        const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
        //console.log("caloriasxid, Cantidad de calorias: " + alimentoEncontrado.calorias);
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
        console.log(registros);
        let calTotales = 0;
        for (let i = 0; i < registros.length; i++) {
            const registro = registros[i];
            console.log("Registro: " + registro);
            const alimentoId = registro.idAlimento;
            console.log("idAlimento: " + alimentoId);
            let cantidadUnidades = 0;

            //Si es "u" no se va a dividir entre 100, sino sí.
            if(proporcionAlimentoXId(alimentoId) != "u"){
                cantidadUnidades = registro.cantidad / 100;
            }
            else{
                cantidadUnidades = registro.cantidad;
            }
            console.log("Cant unidades: " + cantidadUnidades);
            calTotales += caloriasxid(alimentoId) * cantidadUnidades;
            console.log("Cal totales dentro del for: " + calTotales);
        }
        console.log("cal totales fuera del for: " + calTotales);
        setCalTotal(calTotales);
        console.log("calorias seteadas en el state: " + calTotal);
    }, [registros]);


    //Esto es para ver si se actualiza el state automaticamente y no lo hace lptm
    useEffect(() => {
        console.log("calTotal actualizado:", calTotal);
    }, [calTotal]);

    return (
        <div>
            <h3>{calTotal}</h3>
        </div>
    )
}

export default CaloriasTotales

/**const [calTotal, setCalTotal] = useState(0);

    const caloriasxid = (id) => {
        alimentos.forEach(alimento => {
            if (alimento.id === id) {
                return alimento.calorias;
            }
        })
    }



    useEffect(() => {
        registros.forEach(reg => {
            setCalTotal(caloriasxid(reg.idAlimento) * reg.cantidad);
            console.log(reg.cantidad);
            console.log(reg.idAlimento);
            console.log(calTotal);
        })
    }, [registros]);






useEffect(() => {
        const totalCalorias = registros.reduce((total, registro) => {
            const caloriasPorPorcion = caloriasxid(registro.idAlimento);
            console.log("useEffect, caloriasPorPorcion: " + caloriasPorPorcion);
            console.log("useEffect, total: " + total);
            return total + caloriasPorPorcion * registro.cantidad;
        }, 0);

        console.log('Total de calorías:', totalCalorias);
        setCalTotal(totalCalorias);
    }, [registros]);



 */