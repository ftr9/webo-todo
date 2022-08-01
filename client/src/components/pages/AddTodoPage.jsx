import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput';
import HeaderTwo from '../Header/HeaderTwo';
import './AddTodoPage.css';
import PrimaryButton from '../Button/PrimaryButton';
import { connect } from 'react-redux';
import { checkLoginStatusAction } from '../../state/action/authentication';
import { useNavigate } from 'react-router-dom';
import readFile from '../../utils/readFile';
import { uploadFormAction } from '../../state/action/formAction';

const AddTodoPage = ({
  status,
  checkLoginStatusAction,
  userPayload,
  uploadFormAction,
  formStatus,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [error, setError] = useState('');

  const onTitleChange = e => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = e => {
    setDescription(e.target.value);
  };
  const onFileChange = async e => {
    if (!e.target.files[0]) {
      setPreview('');
      return;
    }
    setFile(e.target.files[0]);
    try {
      const url = await readFile(e.target.files[0]);
      setPreview(url);
    } catch (err) {
      console.log(err.message);
    }
  };
  const onexpiryDateChange = e => {
    setExpiryDate(e.target.value);
  };
  const onexpiryTimeChange = e => {
    setExpiryTime(e.target.value);
  };

  const onTodoSubmit = () => {
    if (title && expiryDate && expiryTime) {
      uploadFormAction({
        userid: userPayload.userid,
        title,
        description,
        file,
        expiryDate,
        expiryTime,
      });
    } else {
      setError('tile and expiry Date and time must be filled');
    }
  };

  const navigation = useNavigate();
  useEffect(() => {
    if (status === 'checking_login_status') {
      checkLoginStatusAction();
    }
    if (status === 'notlogged') {
      navigation('/loguser');
    }
    if (formStatus === 'uploaded') {
      navigation('/');
    }
  }, [status, formStatus]);

  return (
    <div className="addtodo_page">
      <HeaderTwo />
      <div className="addtodo_page_form">
        <h1>Add TODO</h1>
        <p className="addtodo_content_form">
          {error
            ? error
            : '* Title and expiration is required while Description and Image is optional'}
        </p>
        <TextInput
          onValueChange={onTitleChange}
          size={'large'}
          inputtype="text"
          placeholder={'Enter a suitable title'}
        />
        <textarea
          onChange={onDescriptionChange}
          placeholder="Enter Description"
        ></textarea>
        <TextInput
          onValueChange={onFileChange}
          inputtype={'file'}
          placeholder="Select image"
          size={'large'}
        ></TextInput>
        {preview && (
          <>
            <div className="addtodo_page_form_filepreview">
              <img src={preview} alt={'upload preview'}></img>
            </div>
          </>
        )}
        <div className="addtodo_page_form_group">
          <p>Set Todo expiry Date and Time</p>
          <TextInput
            onValueChange={onexpiryDateChange}
            inputtype={'date'}
            placeholder={'Enter Date'}
          />
          <TextInput
            onValueChange={onexpiryTimeChange}
            inputtype={'time'}
            marginRight
            placeholder={'Enter Time'}
          />
          <PrimaryButton onPressed={onTodoSubmit} name={'create todo'} large />
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = state => {
  return {
    status: state.user.status,
    userPayload: state.user.userPayload,
    formStatus: state.form.status,
  };
};

export default connect(mapStateToProp, {
  checkLoginStatusAction,
  uploadFormAction,
})(AddTodoPage);
