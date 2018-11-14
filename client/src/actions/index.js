import axios from 'axios';

export const fetchUser = () => async dispatch => {
  let res = await axios.get('/api/current_user');
  if (res.status !== 200) {
    res = await axios.get('/api/current_user');
  }
  dispatch({
    type: 'FETCH_USER',
    user: {
      name: res.data.name,
      credits: res.data.credits,
      picture: res.data.picture,
    },
  });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({
    type: 'FETCH_USER',
    user: {
      name: res.data.name,
      credits: res.data.credits,
      picture: res.data.picture,
    },
  });
};
