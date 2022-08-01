import React from 'react';
import TertiaryButton from '../Button/TertiaryButton';
import './HeaderTwo.css';
import { MdLogout } from 'react-icons/md';
import { logoutUserAction } from '../../state/action/authentication';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HeaderTwo = ({ userpayload, logoutUserAction }) => {
  const navigation = useNavigate();
  const onLogoutPressed = () => {
    logoutUserAction();
    navigation('/loguser');
  };

  return (
    <div className="headerTwo">
      <div className="headerTwo_left">
        <h2>@ {userpayload.username}</h2>
        <p>{userpayload.email}</p>
      </div>
      <div className="headerTwo_right">
        <TertiaryButton
          onPressed={onLogoutPressed}
          icon={<MdLogout />}
          name="Logout"
        />
      </div>
    </div>
  );
};
const mapStateToProp = state => {
  return {
    userpayload: state.user.userPayload,
  };
};

export default connect(mapStateToProp, {
  logoutUserAction,
})(HeaderTwo);
