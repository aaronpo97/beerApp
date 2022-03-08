const getBeerData = async (dispatch) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-access-token': localStorage['access-token'],
      'x-auth-token': localStorage['refresh-token'],
    },
  };
  const url = `/api/beers`;
  const response = await fetch(url, requestOptions);

  if (response.status === 401) {
    dispatch({ type: 'UPDATE_CURRENT_USER', payload: {} });
    localStorage.clear();
  }

  const result = await response.json();

  if (!result.payload) return;

  localStorage['access-token'] = result.payload.newAccessToken || localStorage['access-token'];
  return result.payload;
};

export default getBeerData;
