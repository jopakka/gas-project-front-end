import Modal from 'react-modal';
import {useState} from 'react';
import './LoginRegister.css';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

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

const LoginRegister = ({setVisible}) => {
  const [loginMode, setLoginMode] = useState(true);

  const closeForm = () => {
    setVisible(false);
    setLogin(true);
  };

  const setLogin = (value) => {
    setLoginMode(value);
    const form = document.querySelector('.login-register');
    form && form.reset();
  };

  return (
      <Modal ariaHideApp={false} style={modalStyles} isOpen={true}
             parentSelector={() => document.querySelector('.App')}>
        <div className="cancel" onClick={closeForm}></div>
        {loginMode ?
            <LoginForm toRegister={() => setLogin(false)}
                       setVisible={setVisible}/> :
            <RegisterForm toLogin={() => setLogin(true)}
                          setVisible={setVisible}/>
        }
      </Modal>
  );
};

export default LoginRegister;