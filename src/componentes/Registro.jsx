import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarPaises } from '../features/paisesSlice';

const Registro = () => {
    const campoUser = useRef(null);
    const campoPass = useRef(null);
    const campoCalorias = useRef(null);
    const slcPais = useRef(null);

    const [mensaje, setMensaje] = useState('');
    
    const dispatch = useDispatch();
    const paisesEncontrados = useSelector(state => state.paises.paisesLista);
    
    useEffect(() => {
        fetch("https://calcount.develotion.com/paises.php")
        .then(r => r.json())
        .then(datos => {
            console.log(datos.paises)
            dispatch(guardarPaises(datos.paises))
            })
    }, [])


    const registrarUsuario = () => {
        const usuario = campoUser.current.value;
        const password = campoPass.current.value;
        const caloriasDiarias = parseInt(campoCalorias.current.value);
        const pais = slcPais.current.value;

        if (usuario != null && password != null && caloriasDiarias != null && slcPais !=null
             && usuario != "" && password != "" && caloriasDiarias != "") {

            const data = {
                usuario,
                password,
                idPais: pais,
                caloriasDiarias
            };

            fetch('https://calcount.develotion.com/usuarios.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al registrar usuario');
                    }
                    return response.json();
                })
                .then(responseData => {
                    console.log('Usuario registrado correctamente:', responseData);
                    localStorage.setItem('IDLogueado', responseData.id);
                    localStorage.setItem('TokenLogueado', responseData.apiKey);
                    localStorage.setItem('CaloriasDiariasLogueado', responseData.caloriasDiarias);
                    setMensaje("Usuario agregado correctamente");
                })
                .catch(error => {
                    console.log(error.message);
                    setMensaje("Credenciales no válidas");
                });
        }else{
            setMensaje("Complete los datos.");
        }
    };



    return (
        <div>
            <label> Usuario:
                <input type="text" ref={campoUser} />
            </label>
            <br />
            <label> Contraseña:
                <input type="text" ref={campoPass} />
            </label>
            <br />
            <label> Calorias diarias:
                <input type="text" ref={campoCalorias} />
            </label>
            <br />

            <label>Selecciona un país:
            <select ref={slcPais}>
                {paisesEncontrados.map(pais => (
                    <option key={pais.id} value={pais.id}>{pais.name}</option>
                ))}
            </select>
            </label>
            <br />

            <input type="button" value="Registrarse" onClick={registrarUsuario} />

            <article>
                <p>{mensaje}</p>
            </article>

            <h3>¿Ya tienes una cuenta?</h3> 
            <input type="button" value="LOGUEARSE" />

        </div>
    )
}

export default Registro