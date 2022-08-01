import React from 'react';
import './button.css';
const SecondaryButton = ({ onPressed, name, nocoloured }) => {
  return (
    <div
      onClick={onPressed}
      className={`secondarybutton buttonCommon secondarybuttonSmall ${nocoloured &&
        'secondarybuttonNoBg'}`}
    >
      {name}
    </div>
  );
};

export default SecondaryButton;
