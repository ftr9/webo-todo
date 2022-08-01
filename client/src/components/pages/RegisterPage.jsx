import React, { useState } from 'react';
import { connect } from 'react-redux';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import taskImage from '../../assets/tododoing.svg';
import PrimaryButton from '../Button/PrimaryButton';
import TextInput from '../Input/TextInput';
import { registerUserAction } from '../../state/action/authentication';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const RegisterPage = ({ registerUserAction, status, errorMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(errorMessage);
  const navigation = useNavigate();
  useEffect(() => {
    if (status === 'registered') {
      navigation('/loguser');
    }
  }, [status]);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const onuserNameChange = e => {
    setName(e.target.value);
  };
  const onemailChange = e => {
    setEmail(e.target.value);
  };
  const onpasswordChange = e => {
    setPassword(e.target.value);
  };

  const onResigerButtonClick = async () => {
    if (name && email && password) {
      registerUserAction({
        name,
        email,
        password,
      });
    } else {
      setError('please fill all the input');
    }
  };

  return (
    <div className="register_page">
      <Header />
      <div className="register_content">
        <div className="register_content_form">
          <h1 className="register_content_motive">Register it's Free</h1>
          <p>{error ? error : '* allrequired'}</p>
          <div className="reg0ster_content_form_inputgroup">
            <TextInput
              onValueChange={onuserNameChange}
              size={'small'}
              inputtype="text"
              placeholder={'Enter username'}
            />
            <TextInput
              onValueChange={onemailChange}
              size={'small'}
              marginRight
              inputtype="email"
              placeholder={'Enter Email'}
            />
          </div>
          <TextInput
            onValueChange={onpasswordChange}
            size={'large'}
            inputtype={'password'}
            placeholder={'Enter password'}
          />
          <PrimaryButton onPressed={onResigerButtonClick} name={'Register'} />
          <Link className="register_content_link" to={'/loguser'}>
            Already have an account ?
          </Link>
        </div>
        <div className="register_content_image">
          <img src={taskImage} alt={'task doing'}></img>
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

export default connect(mapStateToProp, { registerUserAction })(RegisterPage);
