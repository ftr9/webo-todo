import React, { useEffect } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import './DashboardPage.css';
import TodoCard from '../Cards/TodoCard';
import Details from '../portal/Details';
import taskImage from '../../assets/task.svg';
import { FiArrowDown } from 'react-icons/fi';
import { MdAddTask } from 'react-icons/md';
import TertiaryButton from '../Button/TertiaryButton';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkLoginStatusAction } from '../../state/action/authentication';
import { fetchTodoAction } from '../../state/action/todoAction';
import {
  getAllStatusTodoAction,
  getOpenStatusTodoAction,
  getProgressTodoAction,
  getCompletedTodoAction,
} from '../../state/action/todoAction';
const DashboardPage = ({
  status,
  userPayload,
  todos,
  checkLoginStatusAction,
  fetchTodoAction,
  selectedTodo,
  getAllStatusTodoAction,
  getOpenStatusTodoAction,
  getProgressTodoAction,
  getCompletedTodoAction,
}) => {
  const navigation = useNavigate();
  const onAddTodoClick = () => {
    navigation('/addtodo');
  };
  const onOptionChange = e => {
    const value = e.target.value;
    switch (value) {
      case 'all status':
        getAllStatusTodoAction();
        break;
      case 'open':
        getOpenStatusTodoAction();
        break;
      case 'progress':
        getProgressTodoAction();
        break;
      case 'completed':
        getCompletedTodoAction();
        break;
      default: {
        return;
      }
    }
  };

  useEffect(() => {
    if (status === 'checking_login_status') {
      checkLoginStatusAction();
    }
    if (status === 'notlogged') {
      navigation('/loguser');
    }
    if (status === 'logged') {
      fetchTodoAction();
    }
  }, [status]);

  if (status === 'checking_login_status') {
    return <h2>Loading ...</h2>;
  }
  return (
    <>
      <div className="dashboard_page">
        <HeaderTwo />
        {todos.values.length !== 0 || todos.original.length !== 0 ? (
          <div className="dashboard_page_content">
            <div className="dashboard_page_content_button">
              <TertiaryButton
                onPressed={onAddTodoClick}
                icon={<MdAddTask />}
                name={'Add Todo'}
              />
              <select
                onChange={onOptionChange}
                className="selectoption"
                defaultValue={'all status'}
              >
                <option>all status</option>
                <option>open</option>
                <option>progress</option>
                <option>completed</option>
              </select>
            </div>
            <div className="dashboard_page_content_activity">
              Your Activities ({todos.values.length})
            </div>
            <div className="dashboard_page_content_todos">
              {todos.values.map((el, index) => (
                <TodoCard key={index} values={el} />
              ))}
            </div>
          </div>
        ) : (
          <div className="dashboard_page_empty">
            <img src={taskImage} alt={'Tasking'}></img>
            <h2>No Activity Click to add some Activity</h2>
            <FiArrowDown />
            <div className="dashboard_page_empty_button">
              <TertiaryButton
                onPressed={onAddTodoClick}
                icon={<MdAddTask />}
                name={'AddTodo'}
              />
            </div>
          </div>
        )}
      </div>
      {selectedTodo.isShown && <Details selectedTodo={selectedTodo} />}
    </>
  );
};

const mapStateToProp = state => {
  return {
    status: state.user.status,
    userPayload: state.user.userPayload,
    todos: state.todos,
    selectedTodo: state.selectedTodo,
  };
};
export default connect(mapStateToProp, {
  checkLoginStatusAction,
  fetchTodoAction,
  getAllStatusTodoAction,
  getOpenStatusTodoAction,
  getProgressTodoAction,
  getCompletedTodoAction,
})(DashboardPage);
