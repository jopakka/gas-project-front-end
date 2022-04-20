import {
  MapContainer,
  Marker,
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

const MapEvents = ({moveEndedAction}) => {
  const map = useMapEvent('moveend', () => {
    if(moveEndedAction) {
      console.log("moveEnded")
      moveEndedAction(map.getBounds())
    }
  })
  return null
}

const Map = ({moveEndedAction, stations, width = "100vw", height = "100vh", center = position}) => {
  return (
      <MapContainer style={{width, height}} center={center} zoom={13}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents moveEndedAction={moveEndedAction}/>
        {stations && stations.map(s => {
          return <Marker key={s.id} position={[s.geometry.coordinates[1], s.geometry.coordinates[0]]}></Marker>
        })}
      </MapContainer>
  );
};

export default Map;