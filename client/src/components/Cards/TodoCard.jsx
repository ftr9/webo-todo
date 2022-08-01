import React from 'react';
import './TodoCard.css';
import SecondaryButton from '../Button/SecondaryButton';
import { clickDetailsAction } from '../../state/action/todoAction';
import { connect } from 'react-redux';
import { deleteTodoAction } from '../../state/action/todoAction';
import { updateTodoAction } from '../../state/action/todoAction';
import getFullDate from '../../utils/getFullDate';
import getFullTime from '../../utils/getFullTime';

const TodoCard = ({
  todos,
  values,
  clickDetailsAction,
  deleteTodoAction,
  updateTodoAction,
}) => {
  const onPressedDetails = () => {
    clickDetailsAction(values.todoId);
  };

  const onPressedDelete = () => {
    deleteTodoAction(values.todoId);
  };

  return (
    <div className="todocard">
      <div className="todocard__left">
        <h2 className="todocard__title">{values.title}</h2>
        <p className="todocard__description">{values.description}</p>
        <p className="todocard-dueDate">
          expiration - {getFullDate(values.dueDate)}
          <span
            style={{
              marginLeft: '5px',
              marginRight: '5px',
              display: 'inline-block',
            }}
          >
            -
          </span>
          {getFullTime(values.dueDate)}
        </p>
      </div>
      <div className="todocard__right">
        <div className="todocard__checkboxes">
          <div>
            <label htmlFor="open">Left</label>
            <input
              id="open"
              type={'checkbox'}
              name="open"
              value={'left'}
              checked={values.status === 'left'}
              onChange={e => {
                updateTodoAction(values.todoId, e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="doing">Doing</label>
            <input
              id="doing"
              type={'checkbox'}
              name="doing"
              value={'progress'}
              checked={values.status === 'progress'}
              onChange={e => {
                updateTodoAction(values.todoId, e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="completed">Completed</label>
            <input
              id="completed"
              type={'checkbox'}
              name="completed"
              value={'completed'}
              checked={values.status === 'completed'}
              onChange={e => {
                updateTodoAction(values.todoId, e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="todocard__buttons">
          <SecondaryButton
            onPressed={onPressedDetails}
            nocoloured
            name={'Details'}
          />
          <div style={{ width: '1rem' }}></div>
          <SecondaryButton onPressed={onPressedDelete} name={'Delete'} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = state => {
  return {
    todos: state.todos.values,
  };
};

export default connect(mapStateToProp, {
  clickDetailsAction,
  deleteTodoAction,
  updateTodoAction,
})(TodoCard);
