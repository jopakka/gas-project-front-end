import {Marker} from 'react-leaflet';
import {useContext} from 'react';
import {MainContext} from '../context/MainContext';

const StationMarker = ({station}) => {
  const {setInfoVisible, setInfoItem} = useContext(MainContext);

  return (
      <Marker
          position={[
            station.geometry.coordinates[1],
            station.geometry.coordinates[0]]}
          eventHandlers={{
            click: () => {
              setInfoItem(station);
              setInfoVisible(true);
            },
          }}
      ></Marker>
  );
};

export default StationMarker;