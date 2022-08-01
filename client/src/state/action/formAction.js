import axios from 'axios';
export const uploadFormAction = formDataValues => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'UPLOADING' });
      const formData = new FormData();
      const dateTime = `${formDataValues.expiryDate} ${formDataValues.expiryTime}`;
      formData.append('userId', formDataValues.userid);
      formData.append('title', formDataValues.title);
      formData.append('description', formDataValues.description);
      formData.append('dueDate', dateTime);
      formData.append('image', formDataValues.file);
      const result = await axios.post('/createTodo', formData);
      if (result.data.status === 'success') {
        dispatch({ type: 'UPLOADED' });
        setTimeout(() => {
          dispatch({ type: 'UPLOAD_OK' });
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
