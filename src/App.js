import './App.css';
import Home from './views/Home';

const App = () => {
  return (
      <div className="App">
        <div style={{flexGrow: 1, height: '100%', display: 'flex'}}>
          <Home/>
        </div>
      </div>
  );
};

export default App;
