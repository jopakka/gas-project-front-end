import logo from './logo.svg';
import './App.css';
import Map from './views/Map';

const test = (bounds) => {
  console.log("testing", bounds)
}

const App = () => {
  return (
    <div className="App">
      <Map moveEndedAction={test}/>
    </div>
  );
}

export default App;
