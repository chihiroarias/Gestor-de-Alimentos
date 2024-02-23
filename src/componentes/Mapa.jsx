import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Mapa = () => {

    const [marcadores, setMarkers] = useState([{lat:-34, lon:-56}]);

    return (
        <div>
            const position = [51.505, -0.09]

            render(
            <MapContainer center={[-34, -56]} zoom={13} scrollWheelZoom={false} 
                style={{width:"100%", height:"400px"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
               {marcadores.map(coord=>  <Marker position={[coord.lat, coord.lon]}>
                    <Popup>
                      {coord.lat} <br /> {coord.lon} 
                    </Popup>
                </Marker>)}
            </MapContainer>,
            )

        </div>
    )
}

export default Mapa