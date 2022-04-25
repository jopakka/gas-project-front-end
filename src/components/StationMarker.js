import {Marker} from 'react-leaflet';
import StationPopup from './StationPopup';
import {useState} from 'react';

const StationMarker = ({station}) => {
  const [isOpen, setIsOpen] = useState();

  return (
      <Marker
          position={[
            station.geometry.coordinates[1],
            station.geometry.coordinates[0]]}
          eventHandlers={{
            click: (e) => {
              console.log('marker clicked', station.stationID);
            },
            popupopen: () => setIsOpen(true),
            popupclose: () => setIsOpen(false),
          }}
      >
        <StationPopup station={station} isOpen={isOpen}/>
      </Marker>
  );
};

export default StationMarker;