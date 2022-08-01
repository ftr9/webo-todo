import ReactDom from 'react-dom';
import React from 'react';
import './Details.css';
import { MdOutlineClose } from 'react-icons/md';
import { closeDetailsAction } from '../../state/action/todoAction';
import { connect } from 'react-redux';
const Details = ({ selectedTodo, closeDetailsAction }) => {
  const { title, description, imageUri } = selectedTodo.payload;

  const onCloseClicked = () => {
    closeDetailsAction();
  };
  return ReactDom.createPortal(
    <div className="details_popup">
      <div className="details_popup_content">
        <div className="details_popup_header">
          <h2>TODO Details</h2>
          <span className="details_popup_close" onClick={onCloseClicked}>
            <MdOutlineClose />
          </span>
        </div>
        <h1 className="details_popup_title">{title}</h1>
        {imageUri && (
          <div className="details_popup_image">
            <img src={`./uploads/${imageUri}`} alt="not fond"></img>
          </div>
        )}

        <p className="details_popup_description">{description}</p>
      </div>
    </div>,
    document.querySelector('.portal')
  );
};

export default connect(null, {
  closeDetailsAction,
})(Details);
