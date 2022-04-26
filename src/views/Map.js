import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {stationsByBounds} from '../utils/queries';
import StationMarker from '../components/StationMarker';
import './Map.css';
import {indexOf} from 'leaflet/src/core/Util';
import LoadingIndicator from '../components/LoadingIndicator';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const position = [60.1689856, 24.9358008];

const mapBounds = (b) => {
  return {
    s: b._southWest.lat,
    w: b._southWest.lng,
    n: b._northEast.lat,
    e: b._northEast.lng,
  };
};

const DisplayStations = ({map}) => {
  const [getStations, {data}] = useLazyQuery(stationsByBounds, {
    fetchPolicy: 'network-only',
    onCompleted: () => {
      console.log('oncomplete');
      setLoading(false);
    },
    onError: () => {
      console.log('onerror');
      setLoading(false);
    },
  });
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  const moveEnd = useCallback(() => {
    (async () => {
      try {
        setLoading(true);
        await getStations({variables: {bounds: mapBounds(map.getBounds())}});
      } catch (e) {
        setLoading(false)
        console.log('moveEnd', e);
      }
    })();
  }, [getStations, map]);

  useEffect(moveEnd, [moveEnd, map]);

  useEffect(() => {
    console.log("loading", loading)
  }, [loading])

  useEffect(() => {
    map.on('moveend', moveEnd);
    return () => {
      map.off('moveend', moveEnd);
    };
  }, [map, moveEnd]);

  useEffect(() => {
    if (data) setStations(data.stationsByBounds);
  }, [data]);

  const displayStations = useMemo(() => (
      <>
        {stations.map(s => (
            <StationMarker key={indexOf(stations, s)} station={s}/>
        ))}
      </>
  ), [stations]);

  return (
      <>
        {loading && <LoadingIndicator/>}
        {displayStations}
      </>
  );
};

const Map = ({
               center = position,
               showAllStation = false,
             }) => {
  const [map, setMap] = useState(null);
  return (
      <MapContainer center={center}
                    zoom={13}
                    minZoom={11}
                    ref={setMap}
                    zoomControl={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright"/>
        {map && showAllStation ? <DisplayStations map={map}/> : null}
      </MapContainer>
  );
};

export default Map;