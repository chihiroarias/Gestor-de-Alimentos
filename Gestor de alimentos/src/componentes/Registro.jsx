import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { guardarPaises } from '../features/paisesSlice';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("IDLogueado") != null) {
            navigate("/");
        }
    })

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
                dispatch(guardarPaises(datos.paises))
            })
    }, [])


    const registrarUsuario = () => {
        const usuario = campoUser.current.value;
        const password = campoPass.current.value;
        const caloriasDiarias = parseInt(campoCalorias.current.value);
        const pais = slcPais.current.value;

        if (usuario != null && password != null && caloriasDiarias != null && slcPais != null
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
                    localStorage.setItem('IDLogueado', responseData.id);
                    localStorage.setItem('TokenLogueado', responseData.apiKey);
                    localStorage.setItem('CaloriasDiariasLogueado', responseData.caloriasDiarias);
                    navigate("/Dashboard");
                })
                .catch(error => {
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
                    <div>
                        <label> Usuario:
                            <input type="text" className="form-control" ref={campoUser} />
                        </label>
                        <br />
                        <label> Contraseña:
                            <input type="text" className="form-control" ref={campoPass} />
                        </label>
                        <br />
                        <label> Calorias diarias:
                            <input type="text" className="form-control" ref={campoCalorias} />
                        </label>
                        <br />
                        <label>Selecciona un país:</label>
                        <select className="form-control" ref={slcPais}>
                            {paisesEncontrados.map(pais => (
                                <option key={pais.id} value={pais.id}>{pais.name}</option>
                            ))}
                        </select>
                        <br />
                        <input
                            type="button"
                            className="btn btn-primary"
                            value="Registrarse"
                            onClick={registrarUsuario}
                        />
                        <article>
                            <p>{mensaje}</p>
                        </article>
                        <Link to="/">¿Ya tienes una cuenta?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registro
