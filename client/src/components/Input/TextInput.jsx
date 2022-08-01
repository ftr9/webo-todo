import React from 'react';
import './TextInput.css';
const TextInput = ({
  size,
  marginRight,
  placeholder,
  inputtype,
  onValueChange,
}) => {
  return (
    <input
      onChange={onValueChange}
      style={{
        width: size === 'large' ? '40rem' : '19rem',
        marginLeft: marginRight && '2rem',
      }}
      className="textinput"
      type={inputtype}
      placeholder={placeholder}
      accept={'image/*'}
    ></input>
  );
};

export default TextInput;
