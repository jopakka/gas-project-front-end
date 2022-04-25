import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const u = Cookies.get('username');
    const token = Cookies.get('token');
    if (u) {
      setUser({username: u, token});
      setIsLoggedIn(true);
    }
  }, []);

  return (
      <MainContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            socket,
            setSocket,
          }}
      >
        {children}
      </MainContext.Provider>
  );
};

export {MainContext, MainProvider};