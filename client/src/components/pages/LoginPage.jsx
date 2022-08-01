import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import './LoginPage.css';
import TextInput from '../Input/TextInput';
import PrimaryButton from '../Button/PrimaryButton';
import { Link } from 'react-router-dom';
import authenticateImage from '../../assets/authenticate.svg';
import { logUserAction } from '../../state/action/authentication';
import { useNavigate } from 'react-router-dom';
const LoginPage = ({ logUserAction, status, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (status === 'logged') {
      navigate('/');
    }
  }, [status]);

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onLoginPressed = () => {
    if (email && password) {
      logUserAction({
        email,
        password,
      });
    } else {
      setError('* input field cannot be left empty');
    }
  };

  return (
    <div className="login_page">
      <Header />
      <div className="login_content">
        <div className="login_content_form">
          <h1 className="login_content_motive">Login</h1>
          <p className="login_content_error">{error}</p>
          <div className="reg0ster_content_form_inputgroup">
            <TextInput
              onValueChange={onEmailChange}
              size={'large'}
              inputtype="text"
              placeholder={'Enter username or Email'}
            />
          </div>
          <TextInput
            onValueChange={onPasswordChange}
            size={'large'}
            inputtype="password"
            placeholder={'Enter password'}
          />
          <PrimaryButton name={'Login'} onPressed={onLoginPressed} />
          <Link className="login_content_link" to={'/reguser'}>
            No account ?
          </Link>
        </div>
        <div className="login_content_image">
          <img src={authenticateImage} alt={'authenticating'}></img>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = state => {
  return {
    status: state.user.status,
    errorMessage: state.user.errorMessage,
  };
};

export default connect(mapStateToProp, { logUserAction })(LoginPage);
