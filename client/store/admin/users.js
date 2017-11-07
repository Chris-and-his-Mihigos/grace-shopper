import axios from 'axios';
import { addError } from '../error';

/* -----------------    ACTION TYPES ------------------ */

const FETCH_USERS = 'FETCH_USERS';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
/* ------------   ACTION CREATORS     ------------------ */

const fetch = users => ({ type: FETCH_USERS, users });
const remove = id => ({ type: REMOVE_USER, id });
const update = user => ({ type: UPDATE_USER, user });

/* ------------       REDUCER     ------------------ */

export default (users = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;

    case REMOVE_USER:
      return users.filter(user => user.id !== action.id);

    case UPDATE_USER:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ));

    default:
      return users;
  }
};
/* ------------   THUNK CREATORS     ------------------ */

export const adminFetchUsers = () => (dispatch) => {
  axios.get('/api/admin/users')
    .then(res => dispatch(fetch(res.data)))
    .catch(err => dispatch(addError(err.response.statusText)));
};

export const adminRemoveUser = id => (dispatch) => {
  dispatch(remove(id));
  axios.delete(`/api/admin/users/${id}`)
    .catch((err) => {
      dispatch(addError(err.response.statusText));
      console.error(`Removing user: ${id} unsuccesful`, err)
    });
};

export const adminUpdateUser = (id, user) => (dispatch) => {
  axios.put(`/api/admin/users/${id}`, user)
    .then(res => dispatch(update(res.data)))
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Updating user: ${user} unsuccesful`, err)
    });
};
