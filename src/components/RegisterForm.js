import {useMutation} from '@apollo/client';
import {register} from '../utils/queries';
import {useContext} from 'react';
import {MainContext} from '../context/MainContext';
import Cookies from 'js-cookie';

const RegisterForm = ({toLogin, setVisible}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const [doRegister] = useMutation(register, {
    onCompleted: (d) => {
      if (!d.registerUser) return;
      Cookies.set('token', d.registerUser.token, { sameSite: 'strict' });
      Cookies.set('username', d.registerUser.username, { sameSite: 'strict' });
      setUser(d.registerUser);
      setIsLoggedIn(true);
      setVisible(false);
    },
  });

  const registerAction = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const username = elements.username.value;
    const password = elements.password.value;
    const confirmPassword = elements.confirmPassword.value;
    try {
      await doRegister({variables: {username, password, confirmPassword}});
    } catch (e) {
      console.error('register', e.graphQLErrors);
    }
  };

  return (
      <>
        <h2>Register</h2>
        <form className="login-register"
              onSubmit={registerAction}>
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
          <label>
            Confirm password
            <input minLength={8} name="confirmPassword" type="password"
                   placeholder="Confirm password"/>
          </label>
          <br/>
          <p onClick={toLogin}>Already have an account? Click here to login</p>
          <br/>
          <input type="submit" value="Register"/>
        </form>
      </>
  );
};

export default RegisterForm;