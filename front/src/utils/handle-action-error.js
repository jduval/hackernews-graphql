const handleActionError = (dispatch, error, actionType, data = {}) => {
  return dispatch({
    type: actionType,
    error,
    data,
  });
};

export default handleActionError;
