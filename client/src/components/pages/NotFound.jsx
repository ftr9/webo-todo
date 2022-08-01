import React from 'react';
import fourofour from '../../assets/fourofour.svg';
import './NotFound.css';
import SecondaryButton from '../Button/SecondaryButton';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <img src={fourofour} alt={'404 not found'}></img>
      <h1>NOT FOUND !</h1>
      <div className="notfound_button">
        <SecondaryButton
          onPressed={() => {
            navigate(-1);
          }}
          name={'Go Back'}
        />
      </div>
    </div>
  );
};

export default NotFound;
