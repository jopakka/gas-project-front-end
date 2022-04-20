import {Marker} from 'react-leaflet';

const StationMarker = ({station}) => {
  return (
      <Marker
          position={[station.geometry.coordinates[1], station.geometry.coordinates[0]]}
          eventHandlers={{
            click: () => {
              console.log("Marker clicked", station.properties.name)
            }
          }}
      />
  )
}

export default StationMarker