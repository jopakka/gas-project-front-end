import './App.css';
import Map from './views/Map';
import {stationsByBounds} from './utils/queries';
import {useQuery} from '@apollo/client';

const App = () => {
  const {loading, error, data, refetch} = useQuery(
      stationsByBounds);
  console.log("loading", loading)
  console.log("error", error)
  console.log("data", data)
  return (
      <div className="App">
        <Map moveEndedAction={async (b) => {
          const bounds = {
            s: b._southWest.lat,
            w: b._southWest.lng,
            n: b._northEast.lat,
            e: b._northEast.lng,
          }
          console.log("refetch on move")
          await refetch({bounds})
        }} stations={data && data.stationsByBounds}/>
      </div>
  );
};

export default App;
