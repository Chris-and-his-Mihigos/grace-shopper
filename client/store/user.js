import axios from 'axios';
import history from '../history';
import { fetchCart } from './cart';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_SESSION = 'SET_SESSION';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const setSess = id => ({ type: SET_SESSION, id })

/**
 * REDUCER
 */
export default (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;

    case REMOVE_USER:
      return defaultUser;

    default:
      return state;
  }
};

export const sessionId = (state = '', action) => {
  switch (action.type) {
    case SET_SESSION:
      return action.id;

    default:
      return state;
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => (dispatch) => {
  axios.get('/auth/me')
    .then((res) => {
      const userData = res.data;
      dispatch(getUser(userData || defaultUser))
      axios.get('/auth/sessionId')
        .then((sess) => {
          dispatch(setSess(sess.data))
          dispatch(fetchCart(userData || sess.data))
        })
    })
    .catch(err => console.log(err))
};

export const auth = (email, password, method) => (dispatch) => {
  axios.post(`/auth/${method}`, { email, password })
    .then((res) => {
      dispatch(getUser(res.data))
      dispatch(fetchCart(res.data))
      history.push('/home')
    })
    .catch(error => dispatch(getUser({ error })))
};

export const logout = () => (dispatch) => {
  axios.post('/auth/logout')
    .then(() => {
      dispatch(removeUser())
      history.push('/login')
    })
    .then(() => axios.get('/auth/sessionId')
      .then((sess) => {
        dispatch(fetchCart(sess.data))
      }))
    .catch(err => console.log(err))
};
