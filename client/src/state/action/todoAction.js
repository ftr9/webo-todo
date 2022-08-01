import axios from 'axios';

export const fetchTodoAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCHING_TODOS' });
    const todos = await axios.get('/getAllTodos');
    dispatch({ type: 'FETCHED_TODOS', payload: todos.data.todos });
  };
};

export const clickDetailsAction = id => {
  return (dispatch, getState) => {
    const {
      todos: { values },
    } = getState();
    const payload = values.find(el => el.todoId === id);
    dispatch({ type: 'GET_SINGLE_TODO', payload: payload });
  };
};

export const closeDetailsAction = () => {
  return { type: 'CLOSE_SINGLE_TODO' };
};

export const deleteTodoAction = todoId => {
  return async (dispatch, getState) => {
    dispatch({ type: 'DELETING_TODO' });
    let response = await axios.delete(`/deleteTodo/${todoId}`);
    if (response.data.status === 'success') {
      const {
        todos: { values },
      } = getState();
      const newTodo = values.filter(el => el.todoId !== todoId);
      dispatch({ type: 'DELETED_TODO', payload: newTodo });
    }
  };
};

export const updateTodoAction = (todoId, stats) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'UPDATING_TODOS' });
    await axios.put('/updateTodo', { todoId, stats });
    const {
      todos: { values },
    } = getState();
    const updatedTodo = values.map(el => {
      if (el.todoId === todoId) {
        el.status = stats;
      }
      return el;
    });
    dispatch({ type: 'UPDATED_TODOS', payload: updatedTodo });
  };
};

export const getAllStatusTodoAction = () => {
  return (dispatch, getState) => {
    const {
      todos: { original },
    } = getState();
    dispatch({ type: 'GET_All_STATUS', payload: original });
  };
};

export const getOpenStatusTodoAction = () => {
  return (dispatch, getState) => {
    const {
      todos: { original },
    } = getState();
    const leftTodos = original.filter(el => el.status === 'left');
    dispatch({ type: 'GET_OPEN_STATUS', payload: leftTodos });
  };
};

export const getProgressTodoAction = () => {
  return (dispatch, getState) => {
    const {
      todos: { original },
    } = getState();
    const progressTodos = original.filter(el => el.status === 'progress');
    dispatch({ type: 'GET_PROGRESS_STATUS', payload: progressTodos });
  };
};
export const getCompletedTodoAction = () => {
  return (dispatch, getState) => {
    const {
      todos: { original },
    } = getState();
    const completedTodos = original.filter(el => el.status === 'completed');
    dispatch({ type: 'GET_COMPLETED_STATUS', payload: completedTodos });
  };
};
