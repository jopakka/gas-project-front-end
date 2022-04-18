import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const position = [60.1689856, 24.9358008];

const MoveEnded = ({moveEndedAction}) => {
  const map = useMapEvent('moveend', () => {
    moveEndedAction(map.getBounds())
  })
  return null
}

const Map = ({moveEndedAction, width = "100vw", height = "100vh", center = position}) => {
  return (
      <MapContainer style={{width, height}} center={center} zoom={13}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MoveEnded moveEndedAction={moveEndedAction}/>
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
  );
};

export default Map;