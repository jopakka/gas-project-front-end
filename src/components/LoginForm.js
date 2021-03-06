import {useLazyQuery} from '@apollo/client';
import {login} from '../utils/queries';
import {useContext, useState} from 'react';
import {MainContext} from '../context/MainContext';

const LoginForm = ({toRegister, setVisible}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const [error, setError] = useState(undefined);
  const [doLogin] = useLazyQuery(login, {
    fetchPolicy: 'network-only',
    onCompleted: (d) => {
      if (d.login) {
        localStorage.setItem('token', d.login.token);
        localStorage.setItem('username', d.login.username);
        setUser(d.login);
        setIsLoggedIn(true);
        setVisible(false);
      }
    },
    onError: (d) => {
      setError(d.message);
    },
  });

  const loginAction = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const username = elements.username.value;
    const password = elements.password.value;
    try {
      await doLogin({variables: {username, password}});
    } catch (e) {
      console.error('loginError', e.graphQLErrors);
    }
  };

  return (
      <>
        <h2>Login</h2>
        <form className="login-register"
              onSubmit={loginAction}>
          <label>
            Username
            <input minLength={5} name="username" type="text"
                   placeholder="Enter username"/>
          </label>
          <br/>
          <label>
            Password
            <input minLength={8} name="password" type="password"
                   placeholder="Enter password"/>
          </label>
          {error && <p className="error">{error}</p>}
          <br/>
          <p onClick={toRegister}>Don't have an account yet? Click here to
            register</p>
          <br/>
          <input type="submit" value="Login"/>
        </form>
      </>
  );
};

export default LoginForm;