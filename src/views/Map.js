import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvent, ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import StationMarker from '../components/StationMarker';

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
      <MapContainer style={{width, height}} center={center} zoom={13} minZoom={11} zoomControl={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <MapEvents moveEndedAction={moveEndedAction}/>
        {stations && stations.map(s => {
          return <StationMarker  key={s.id} station={s} />
        })}
      </MapContainer>
  );
};

export default Map;