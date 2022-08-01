import React from 'react';
import './button.css';
const TertiaryButton = ({ name, icon, onPressed }) => {
  return (
    <div onClick={onPressed} className="tertiaryButton buttonCommon">
      {icon}
      <p>{name}</p>
    </div>
  );
};

export default TertiaryButton;
