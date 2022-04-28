import './App.css';
import TopBar from './components/TopBar';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from './context/MainContext';
import io from 'socket.io-client';
import {apiUrl} from './utils/variables';
import Favorites from './views/Favorites';
import {Route, Routes} from 'react-router-dom';
import Home from './views/Home';
import LoginRegister from './views/LoginRegister';
import InfoPage from './views/InfoPage';
import ModalInfo from './components/ModalInfo';

const App = () => {
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    setSocket,
    infoVisible,
    setInfoVisible,
    infoItem,
  } = useContext(
      MainContext);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const newSocket = io(apiUrl);
    if (newSocket) setSocket(newSocket);
  }, [setSocket]);

  const loginLinks = [
    {
      title: 'Login/register',
      path: '/',
    },
  ];

  const loggedInLinks = [
    {
      title: user && user.username,
      path: '/profile',
    },
    {
      title: 'Favorites',
      path: '/favorites',
    },
    {
      title: 'Map',
      path: '/',
    },
    {
      title: 'Logout',
      path: '/',
      action: () => {
        console.log('Logout');
        if (window.confirm('Do you want to log out?')) {
          localStorage.clear();
          setUser(undefined);
          setIsLoggedIn(false);
        }
      },
    },
  ];

  return (
      <div className="App">
        {loginVisible && <LoginRegister setVisible={setLoginVisible}/>}
        {infoVisible && <InfoPage item={infoItem} isOpen={infoVisible}
                                  setVisible={setInfoVisible}/>}
        <div style={{flexGrow: 1, height: '100%', display: 'flex'}}>
          <div style={{flex: 1}}>
            <TopBar profileLinks={!isLoggedIn ? loginLinks : loggedInLinks}/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/favorites" element={<Favorites/>}/>
              <Route path="/station/:type/:id" element={<ModalInfo />}/>
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default App;
