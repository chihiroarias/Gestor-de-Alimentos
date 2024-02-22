import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const CaloriasTotales = () => {

    const registros = useSelector(state => state.registros.registrosLista);
    const alimentos = useSelector(state => state.alimentos.listAlimentos);

    const [calTotal, setCalTotal] = useState(0);

const caloriasxid = (id) => {
    const alimentoEncontrado = alimentos.find(alimento => alimento.id === id);
    return alimentoEncontrado ? alimentoEncontrado.calorias : 0;
};

useEffect(() => {
    const totalCalorias = registros.reduce((total, reg) => {
        const calorias = caloriasxid(reg.idAlimento);
        return total + calorias * reg.cantidad;
        
    }, 0);

    setCalTotal(totalCalorias);
}, [registros]);


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

 */