import './App.css';
import Home from './views/Home';
import TopBar from './components/TopBar';
import {useContext, useEffect, useState} from 'react';
import LoginRegister from './views/LoginRegister';
import {MainContext} from './context/MainContext';

const App = () => {
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {

  }, [user])

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
