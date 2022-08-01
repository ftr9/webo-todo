export default function(
  state = {
    isShown: false,
    payload: {},
  },
  action
) {
  switch (action.type) {
    case 'GET_SINGLE_TODO':
      return { ...state, isShown: true, payload: action.payload };
    case 'CLOSE_SINGLE_TODO':
      return { ...state, isShown: false, payload: {} };
    default: {
      return state;
    }
  }
}
