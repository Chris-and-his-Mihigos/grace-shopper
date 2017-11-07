
/* -----------------    ACTION TYPES ------------------ */

const ADD_ERROR = 'FETCH_ERROR';
const CLEAR_ERROR = 'CREATE_ERROR';

/* ------------   ACTION CREATORS     ------------------ */


export const add = error => ({ type: ADD_ERROR, error });
export const clear = () => ({ type: CLEAR_ERROR });
/* ------------       REDUCER     ------------------ */


export default (error = null, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return action.error;

    case CLEAR_ERROR:
      return null;

    default:
      return error;
  }
};
/* ------------   THUNK CREATORS     ------------------ */
