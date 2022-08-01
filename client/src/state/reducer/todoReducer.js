const todoReducer = (
  state = { status: 'not fetching', values: [], original: [] },
  action
) => {
  switch (action.type) {
    case 'FETCHING_TODOS':
      return { ...state, status: 'fetching' };
    case 'FETCHED_TODOS':
      return {
        ...state,
        status: 'not fetching',
        values: action.payload,
        original: action.payload,
      };
    case 'DELETING_TODO':
      return { ...state, status: 'deleting' };
    case 'DELETED_TODO':
      return {
        ...state,
        status: 'not fetching',
        values: action.payload,
        original: action.payload,
      };
    case 'UPDATING_TODOS':
      return { ...state, status: 'updating' };
    case 'UPDATED_TODOS':
      return {
        ...state,
        status: 'not fetching',
        values: action.payload,
        original: action.payload,
      };
    case 'GET_All_STATUS':
      return { ...state, values: action.payload };
    case 'GET_OPEN_STATUS':
      return { ...state, values: action.payload };
    case 'GET_PROGRESS_STATUS':
      return { ...state, values: action.payload };
    case 'GET_COMPLETED_STATUS':
      return { ...state, values: action.payload };
	 case 'LOGGED-OUT':
      return { ...state, values: [], original: [] };

    default: {
      return state;
    }
  }
};

export default todoReducer;
