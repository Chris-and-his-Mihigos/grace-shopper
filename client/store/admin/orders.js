import axios from 'axios';
import { add as addError } from '../error';

/* -----------------    ACTION TYPES ------------------ */

const UPDATE_ORDER = 'UPDATE_ORDER';

/* ------------   ACTION CREATORS     ------------------ */

const update = order => ({ type: UPDATE_ORDER, order });

/* ------------       REDUCER     ------------------ */

export default (orders = [], action) => {
  switch (action.type) {
    case UPDATE_ORDER:
      return orders.map(order => (
        action.order.id === order.id ? action.order : order
      ));

    default:
      return orders;
  }
};

/* ------------   THUNK CREATOR     ------------------ */

export const adminUpdateOrder = (id, order) => (dispatch) => {
  axios.put(`/api/admin/orders/${id}`, order)
    .then((res) => {
      dispatch(update(res.data))
    })
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Updating order: ${order} unsuccesful`, err)
    });
};
