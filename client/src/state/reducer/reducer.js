import { combineReducers } from 'redux';
import authenticateReducer from './loginreducer';
import todoReducer from './todoReducer';
import formReducer from './formReducer';
import todoFilterReducer from './todoFilterReducer';
const allReducers = combineReducers({
  user: authenticateReducer,
  todos: todoReducer,
  form: formReducer,
  selectedTodo: todoFilterReducer,
});

export default allReducers;
