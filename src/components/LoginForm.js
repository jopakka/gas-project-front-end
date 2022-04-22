import {useLazyQuery} from '@apollo/client';
import {login} from '../utils/queries';
import {useContext, useEffect} from 'react';
import {MainContext} from '../context/MainContext';

const LoginForm = ({toRegister}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext)
  const [doLogin] = useLazyQuery(login, {
    onCompleted: (d) => {
      setUser(d.login)
      setIsLoggedIn(true)
    }
  });

  const loginAction = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const username = elements.username.value;
    const password = elements.password.value;
    try {
      await doLogin({variables: {username, password}});
    } catch (e) {
      console.error("loginError", e)
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