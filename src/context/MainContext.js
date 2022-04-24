import React, {useEffect, useState} from 'react';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const u = localStorage.getItem('username');
    const token = localStorage.getItem('token')
    if (u) {
      setUser({username: u, token});
      setIsLoggedIn(true)
    }
  }, []);

  return (
      <MainContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
          }}
      >
        {children}
      </MainContext.Provider>
  );
};

export {MainContext, MainProvider};