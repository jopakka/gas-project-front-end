import './App.css';
import TopBar from './components/TopBar';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from './context/MainContext';
import {io} from 'socket.io-client';
import {apiUrl} from './utils/variables';
import Favorites from './views/Favorites';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Home from './views/Home';
import LoginRegister from './views/LoginRegister';
import InfoPage from './views/InfoPage';
import Profile from './views/Profile';
import PrivateRoute from './components/PrivateRoute';

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
  const location = useLocation();
  const [path, setPath] = useState('/');
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  useEffect(() => {
    const newSocket = io(apiUrl);
    newSocket.on('connect', () => {
      console.log('Socket connected', newSocket);
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  const loginLinks = [
    {
      title: 'Login/register',
      path: '/',
      action: () => setLoginVisible(true),
    },
  ];

  const loggedInLinks = [
    {
      title: 'Map',
      path: '/',
    },
    {
      title: 'Favorites',
      path: '/favorites',
    },
    {
      title: user && user.username,
      path: '/profile',
    },
    {
      title: 'Logout',
      path,
      action: () => {
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
        <LoginRegister isVisible={loginVisible} setVisible={setLoginVisible}/>
        <InfoPage item={infoItem} isOpen={infoVisible}
                  setVisible={setInfoVisible}/>
        <div style={{flexGrow: 1, height: '100%', display: 'flex'}}>
          <div style={{flex: 1}}>
            <TopBar profileLinks={!isLoggedIn ? loginLinks : loggedInLinks}/>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/favorites"
                     element={<PrivateRoute element={<Favorites/>}/>}/>
              <Route path="/profile"
                     element={<PrivateRoute element={<Profile/>}/>}/>
              <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default App;
