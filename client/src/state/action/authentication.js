import axios from 'axios';
export const registerUserAction = formdata => {
  return async (dispatch, getState) => {
    dispatch({ type: 'REGISTERING', payload: '' });
    try {
      await axios.post('/register', {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      });
      dispatch({ type: 'REGISTERED', payload: '' });
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAILED',
        payload: err.response.data,
      });
    }
  };
};

export const logUserAction = formdata => {
  return async (dispatch, getState) => {
    dispatch({ type: 'LOGGING', payload: '' });
    try {
      const loggedUser = await axios.post('/login', {
        email: formdata.email,
        password: formdata.password,
      });
      dispatch({ type: 'LOGGED', payload: loggedUser.data });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAILED',
        payload: err.response.data,
      });
    }
  };
};

export const logoutUserAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'LOGGING_OUT' });
      await axios.post('/logout');
      dispatch({ type: 'LOGGED-OUT' });
    } catch (err) {
      dispatch({
        type: 'LOGOUT_FAILED',
        payload: err.response.data,
      });
    }
  };
};

export const checkLoginStatusAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'CHECKING_LOGIN_STATUS' });
      const loggedUser = await axios.get('/checkloginstatus');
      dispatch({ type: 'LOGGED', payload: loggedUser.data });
    } catch (err) {
      dispatch({
        type: 'LOGGED-OUT',
      });
    }
  };
};
