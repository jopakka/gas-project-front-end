import './App.css';
import Home from './views/Home';
import TopBar from './components/TopBar';
import {useContext, useEffect, useState} from 'react';
import LoginRegister from './views/LoginRegister';
import {MainContext} from './context/MainContext';
import io from 'socket.io-client';
import {apiUrl} from './utils/variables';
import Favorites from './views/Favorites';

const App = () => {
  const {user, setUser, isLoggedIn, setIsLoggedIn, setSocket} = useContext(
      MainContext);
  const [loginVisible, setLoginVisible] = useState(false);
  const [openView, setOpenView] = useState('home');

  useEffect(() => {
    const newSocket = io(apiUrl);
    if (newSocket) setSocket(newSocket);
  }, [setSocket]);

  const loginLinks = [
    {
      title: 'Login/register',
      action: () => setLoginVisible(!loginVisible),
    },
  ];

  const loggedInLinks = [
    {
      title: user && user.username,
      action: () => console.log('Clicked user'),
    },
    {
      title: openView === 'home' ? 'Favorites' : 'Map',
      action: () => setOpenView(openView === 'home' ? 'favorites' : 'home'),
    },
    {
      title: 'Logout',
      action: () => {
        console.log('Logout');
        if (window.confirm('Do you want to log out?')) {
          localStorage.clear();
          setUser(undefined);
          setIsLoggedIn(false);
          setOpenView('home');
        }
      },
    },
  ];

  return (
      <div className="App">
        {loginVisible && <LoginRegister setVisible={setLoginVisible}/>}
        <div style={{flexGrow: 1, height: '100%', display: 'flex'}}>
          <div style={{flex: 1}}>
            <TopBar profileLinks={!isLoggedIn ? loginLinks : loggedInLinks}/>
            {openView === 'favorites' ?
                <Favorites/> :
                <Home/>
            }
          </div>
        </div>
      </div>
  );
};

export default App;
