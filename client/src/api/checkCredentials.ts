const checkCredentials = async (dispatch): Promise<void> => {
  if (!(localStorage['access-token'] && localStorage['refresh-token'])) return;
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': localStorage['access-token'],
      'x-auth-token': localStorage['refresh-token'],
    },
  };
  const response = await fetch('/api/users/verifytoken', requestOptions);
  const data = await response.json();
  if (response.status !== 200) {
    dispatch({ type: 'UPDATE_CURRENT_USER', payload: {} });
  }

  dispatch({ type: 'UPDATE_CURRENT_USER', payload: data.payload });
};

export default checkCredentials;
