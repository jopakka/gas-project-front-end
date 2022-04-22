import Modal from 'react-modal';
import {useContext, useEffect, useState} from 'react';
import './LoginRegister.css';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {MainContext} from '../context/MainContext';

const modalStyles = {
  overlay: {
    zIndex: 1000,
    textAlign: 'center',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100vw',
    maxHeight: '100vh ',
  },
};

const LoginRegister = ({visible, setVisible}) => {
  const {isLoggedIn} = useContext(MainContext);
  const [loginMode, setLoginMode] = useState(true);

  useEffect(() => {
    setVisible(!isLoggedIn)
    setLogin(isLoggedIn)
  }, [isLoggedIn, setVisible]);
  
  const closeForm = () => {
    setVisible(false)
    setLogin(true)
  }

  const setLogin = (value) => {
    setLoginMode(value);
    const form = document.querySelector('.login-register');
    form && form.reset();
  };

  return (
      <Modal ariaHideApp={false} style={modalStyles} isOpen={visible}
             parentSelector={() => document.querySelector('.App')}>
        <div className="cancel" onClick={closeForm}></div>
        {loginMode ?
            <LoginForm toRegister={() => setLogin(false)}/> :
            <RegisterForm toLogin={() => setLogin(true)}/>
        }
      </Modal>
  );
};

export default LoginRegister;