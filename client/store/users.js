import axios from 'axios';
import { addError } from './error';

/**
 * ACTION TYPES
 */

const ADMIN_FETCH_USERS = 'ADMIN_FETCH_USERS';
const ADMIN_DELETE_USER = 'ADMIN_DELETE_USER';
const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER';
/**

/**
 * ACTION CREATORS
 */

const fetchUsers = users => ({ type: ADMIN_FETCH_USERS, users });
const deleteUser = id => ({ type: ADMIN_DELETE_USER, id });
const updateUser = user => ({ type: ADMIN_UPDATE_USER, user });

/**
 * REDUCER
 */
export default (users = [], action) => {
  switch (action.type) {
    case ADMIN_FETCH_USERS:
      return [action.users, ...users];

    case ADMIN_DELETE_USER:
      return users.filter(user => user.id !== action.id);

    case ADMIN_UPDATE_USER:
      return users.map(user => (
        action.user.id === user.id ? action.user : user));

    default:
      return users;
  }
};

/**
 * THUNK CREATORS
 */

// ADMIN THUNKS

export const adminFetchUsers = () => (dispatch) => {
  axios.get('/api/admin/users')
    .then(res => dispatch(fetchUsers(res.data)))
    .catch(err => dispatch(addError(err.response.statusText)));
};

export const adminRemoveUser = id => (dispatch) => {
  dispatch(deleteUser(id));
  axios.delete(`/api/admin/users/${id}`)
    .catch((err) => {
      dispatch(addError(err.response.statusText));
      console.error(`Removing user: ${id} unsuccesful`, err)
    });
};

export const adminUpdateUser = (id, user) => (dispatch) => {
  axios.put(`/api/admin/users/${id}`, user)
    .then(res => dispatch(updateUser(res.data)))
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Updating user: ${user} unsuccesful`, err)
    });
};
