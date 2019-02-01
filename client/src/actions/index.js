import axios from 'axios';

export const fetchUser = () => async dispatch => {
  let res = await axios.get('/api/current_user');

  if (!res.data) {
    return dispatch({
      type: 'FETCH_USER',
      user: false
    });
  }
  if (!res.data) {
    return dispatch({
      type: 'FETCH_USER',
      user: false
    });
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

export const sendSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  if (res.status === 403) {
    alert('No money, no honey!')
  }
  history.push('/')
  dispatch({
    type: 'FETCH_USER',
    user: {
      name: res.data.name,
      credits: res.data.credits,
      picture: res.data.picture,
    },
  });
}

export const getUserSurveys = () => async dispatch => {
  const surveys = await axios.get('/api/surveys')
  return dispatch({
    type: 'FETCH_SURVEYS',
    surveys: surveys.data
  })
}
