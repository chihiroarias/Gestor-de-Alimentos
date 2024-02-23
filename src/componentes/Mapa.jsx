import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarPaises } from '../features/paisesSlice';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Mapa = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://calcount.develotion.com/paises.php")
            .then(r => r.json())
            .then(datos => {
                dispatch(guardarPaises(datos.paises))
            })
    }, [])


    let iduser = localStorage.getItem("IDLogueado");
    let key = localStorage.getItem("TokenLogueado");

    const paises = useSelector(state => state.paises.paisesLista);

    console.log(paises);
    const [cantPorPais, setCantpais] = useState([]);

    useEffect(() => {
        fetch("https://calcount.develotion.com/usuariosPorPais.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': key,
                'iduser': iduser
            }
        })
            .then(response => response.json())
            .then(datos => {
                setCantpais(datos.paises);
            })
            .catch(error => {
                console.error('Error al obtener registros:', error);
            });
    }, []);


    return (
        <div>
            const position = [51.505, -0.09]

            <MapContainer center={[-34, -56]} zoom={4} scrollWheelZoom={false}
                style={{ width: "100%", height: "400px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {paises.map(coord => {
                    const paisInfo = cantPorPais.find(pais => pais.id === coord.id);
                    const cantidadPersonas = paisInfo ? paisInfo.cantidadDeUsuarios: 0;

                    return (
                        <Marker key={coord.id} position={[coord.latitude, coord.longitude]}>
                            <Popup>
                                País: {coord.nombre} <br />
                                Latitud: {coord.latitude} <br />
                                Longitud: {coord.longitude} <br />
                                Cantidad de Personas: {cantidadPersonas}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>


        </div>
    )
}

export default Mapa;