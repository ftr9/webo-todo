const authenticateReducer = (
  state = {
    status: 'checking_login_status',
    errorMessage: '',
    userPayload: {},
  },
  action
) => {
  switch (action.type) {
    case 'REGISTERING':
      return { ...state, status: 'registering', errorMessage: '' };
    case 'REGISTERED':
      return { ...state, status: 'registered', errorMessage: '' };
    case 'REGISTER_FAILED':
      return {
        ...state,
        status: 'register_failed',
        errorMessage: action.payload.message,
      };
    case 'LOGGING':
      return { ...state, status: 'logging', errorMessage: '' };
    case 'LOGGED':
      return {
        ...state,
        status: 'logged',
        errorMessage: '',
        userPayload: action.payload,
      };
    case 'CHECKING_LOGIN_STATUS':
      return { ...state, status: 'checking_login_status' };
    case 'LOGIN_FAILED':
      return {
        ...state,
        status: 'login_failed',
        errorMessage: action.payload.message,
      };
    case 'LOGGING_OUT':
      return { ...state, status: 'loggingout' };
    case 'LOGGED-OUT':
      return { status: 'notlogged', errorMessage: '', userPayload: {} };
    default: {
      return state;
    }
  }
};

export default authenticateReducer;
