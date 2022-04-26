import {Marker} from 'react-leaflet';
import StationPopup from './StationPopup';
import {useState} from 'react';

const StationMarker = ({station}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Marker
          position={[
            station.geometry.coordinates[1],
            station.geometry.coordinates[0]]}
          eventHandlers={{
            click: () => {
              console.log('marker clicked', station.id);
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