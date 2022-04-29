import {Navigate} from 'react-router-dom';
import {useContext} from 'react';
import {MainContext} from '../context/MainContext';

const PrivateRoute = ({element}) => {
  const {user} = useContext(MainContext);
  return (
      <>
        {
          user ? element : <Navigate to="/"/>
        }
      </>
  );
};

export default PrivateRoute;