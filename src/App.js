import './App.css';
import Home from './views/Home';
import TopBar from './components/TopBar';
import {useContext, useEffect, useState} from 'react';
import LoginRegister from './views/LoginRegister';
import {MainContext} from './context/MainContext';
import io from 'socket.io-client';
import {apiUrl} from './utils/variables';

const App = () => {
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  const [loginVisible, setLoginVisible] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(apiUrl);
    setSocket(newSocket);
  }, [setSocket]);

  const links = [
    {
      title: 'Home',
      action: () => console.log('Home'),
    },
    {
      title: 'Favorites',
      action: () => console.log('Favorites'),
    },
  ];

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
      title: 'Logout',
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
        <div style={{flexGrow: 1, height: '100%', display: 'flex'}}>
          <div style={{flex: 1}}>
            <TopBar links={links}
                    profileLinks={!isLoggedIn ? loginLinks : loggedInLinks}/>
            <Home/>
          </div>
        </div>
      </div>
  );
};

export default App;
