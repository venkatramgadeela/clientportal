import { push } from 'react-router-redux';
import axios from 'axios';

export const AUTH_LOGIN_PENDING = 'AUTH_LOGIN_PENDING';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_REJECTED = 'AUTH_LOGIN_REJECTED';

export const AUTH_LOGOUT_PENDING = 'AUTH_LOGOUT_PENDING';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_REJECTED = 'AUTH_LOGOUT_REJECTED';

export const logInAction = email => async dispatch => {
  dispatch({
    type: AUTH_LOGIN_PENDING
  });
  try {
    const res = await axios.post('/api/login', {
      email
    });
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(push('/dashboard'));
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_REJECTED,
      payload: 'Invalid login'
    });
  }
};

export const logOutAction = email => async dispatch => {
  dispatch({
    type: AUTH_LOGOUT_PENDING
  });
  try {
    await axios.get('/api/logout');
    dispatch({
      type: AUTH_LOGIN_SUCCESS
    });
    dispatch(push('/login'));
  } catch (error) {
    dispatch({
      type: AUTH_LOGOUT_REJECTED,
      payload: error
    });
  }
};
