import './App.css';
import Home from './views/Home';
import TopBar from './components/TopBar';
import {useContext, useState} from 'react';
import LoginRegister from './views/LoginRegister';
import {MainContext} from './context/MainContext';

const App = () => {
  const {isLoggedIn} = useContext(MainContext)
  const [loginVisible, setLoginVisible] = useState(false);

  const links = [
    {
      title: 'Home',
      action: () => console.log("Home"),
    },
    {
      title: 'Favorites',
      action: () => console.log("Favorites"),
    },
  ];

  const profileLinks = [
    {
      title: 'Login/register',
      action: () => setLoginVisible(!loginVisible),
    },
  ];

  return (
      <div className="App">
        <LoginRegister visible={loginVisible} setVisible={setLoginVisible} />
        <div style={{flexGrow: 1, height: '100%', display: 'flex'}}>
          <div style={{flex: 1}}>
            <TopBar links={links} profileLinks={!isLoggedIn ? profileLinks : []}/>
            <Home/>
          </div>
        </div>
      </div>
  );
};

export default App;
