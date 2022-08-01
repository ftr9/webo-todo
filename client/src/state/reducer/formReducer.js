export default function(
  state = { status: 'not uploading', errorMessage: '' },
  action
) {
  switch (action.type) {
    case 'UPLOADING':
      return { ...state, status: 'uploading', errorMessage: '' };
    case 'UPLOADED':
      return { ...state, status: 'uploaded', errorMessage: '' };
    case 'UPLOAD_OK':
      return { ...state, status: 'not uploading' };
    default: {
      return state;
    }
  }
}
