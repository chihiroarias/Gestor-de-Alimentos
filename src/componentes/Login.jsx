import React from 'react'
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const campoUser = useRef(null);
    const campoPass = useRef(null);

    const [mensaje, setMensaje] = useState("");

    //Esto es para deshabilitar el botón.
    const [usuarioCampoRastreo, setUsuario] = useState('');
    const [passwordCampoRastreo, setPassword] = useState('');

    const navigate = useNavigate();

    const rastrearUser = e => {
        setUsuario(e.target.value)
    }

    const rastrearPass = e => {
        setPassword(e.target.value)
    }

    const loginUsuario = () => {
        const usuario = campoUser.current.value;
        const password = campoPass.current.value;


        if (usuario !== null && usuario !== "" && password !== null && password !== "") {

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
                    navigate("/Dashboard");

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
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form>
                        <div className="form-group">
                            <label htmlFor="usuario">Usuario:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="usuario"
                                ref={campoUser}
                                onChange={rastrearUser}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="contrasena"
                                ref={campoPass}
                                onChange={rastrearPass}
                            />
                        </div>
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="Loguearse"
                            onClick={loginUsuario}
                            disabled={!usuarioCampoRastreo || !passwordCampoRastreo}
                        />
                        <article>
                            <h2>{mensaje}</h2>
                        </article>
                        <Link to="/Registro">¿No estás registrado?</Link>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login


/* Antes

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

            <Link to="/Registro">¿No estas registrado?</Link>

        </div>
*/