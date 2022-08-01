import React from 'react';
import './button.css';
const PrimaryButton = ({ name, large, onPressed }) => {
  return (
    <div
      onClick={onPressed}
      className="primarybutton buttonCommon"
      style={{ width: large && '40rem' }}
    >
      {name}
    </div>
  );
};

export default PrimaryButton;
