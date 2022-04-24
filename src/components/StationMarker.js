import {Marker} from 'react-leaflet';
import StationPopup from './StationPopup';

const StationMarker = ({station}) => {

  return (
      <Marker
          position={[
            station.geometry.coordinates[1],
            station.geometry.coordinates[0]]}
      >
        <StationPopup station={station}/>
      </Marker>
  );
};

export default StationMarker;