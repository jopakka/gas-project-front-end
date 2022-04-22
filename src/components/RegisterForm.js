import {useMutation} from '@apollo/client';
import {register} from '../utils/queries';
import {useContext, useEffect} from 'react';
import {MainContext} from '../context/MainContext';

const RegisterForm = ({toLogin}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const [doRegister] = useMutation(register, {
    onCompleted: (d) => {
      setUser(d.registerUser);
      setIsLoggedIn(true)
    },
  });

  const registerAction = async (e) => {
    e.preventDefault();
    console.log('register');
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