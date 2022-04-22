import React, {useState} from 'react';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

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