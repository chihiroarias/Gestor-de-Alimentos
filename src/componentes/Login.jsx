import React from 'react'
import { useState, useRef } from 'react';

const Login = () => {
    const campoUser = useRef(null);
    const campoPass = useRef(null);

    const [mensaje, setMensaje] = useState("");

    //Esto es para deshabilitar el botón.
    const [usuarioCampoRastreo, setUsuario] = useState('');
    const [passwordCampoRastreo, setPassword] = useState('');

    const rastrearUser = e => {
        setUsuario(e.target.value)
    }

    const rastrearPass = e => {
        setPassword(e.target.value)
    }

    const loginUsuario = () => {
        const usuario = campoUser.current.value;
        const password = campoPass.current.value;

        if (usuario != null && usuario != "" && password != null && password != "" ) {

            const data = {
                usuario,
                password,
            };

            fetch('https://calcount.develotion.com//login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.mensaje);
                    }
                    return response.json();
                })
                .then(responseData => {
                    console.log('Usuario logueado correctamente:', responseData);
                    localStorage.setItem('IDLogueado', responseData.id);
                    localStorage.setItem('TokenLogueado', responseData.apiKey);
                    localStorage.setItem('CaloriasDiariasLogueado', responseData.caloriasDiarias);
                    //REDIRIGIR AL DASHBOARD
                    setMensaje("Usuario logueado correctamente.");
                })
                .catch(error => {
                    console.log(error.message);
                    setMensaje("Credenciales no válidas");
                });
        } else {
            setMensaje("Complete los datos.");
        }

    };



    return (
        <div>
            <label> Usuario:
                <input type="text" ref={campoUser} onChange={rastrearUser} />
            </label>
            <br />
            <label> Contraseña:
                <input type="text" ref={campoPass} onChange={rastrearPass} />
            </label>
            <br />

            <input type="button" value="Loguearse" onClick={loginUsuario} disabled={!usuarioCampoRastreo || !passwordCampoRastreo} />

            <article>
                <h2>{mensaje}</h2>
            </article>
            <br />

            <h3>¿No estas registrado?</h3> 
            <input type="button" value="REGISTRARME" />

        </div>
    )
}

export default Login