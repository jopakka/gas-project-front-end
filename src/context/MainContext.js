import React, {useEffect, useState} from 'react';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [socket, setSocket] = useState(undefined);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoItem, setInfoItem] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (u && token) {
      setUser({username: u, token});
      setIsLoggedIn(true);
    }
  }, []);

  return (
      <MainContext.Provider
          value={{
            isLoggedIn, setIsLoggedIn,
            user, setUser,
            socket, setSocket,
            infoVisible, setInfoVisible,
            infoItem, setInfoItem,
            refresh, setRefresh,
          }}
      >
        {children}
      </MainContext.Provider>
  );
};

export {MainContext, MainProvider};