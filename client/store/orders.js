import axios from 'axios';
import { updateID, clearCart } from './cart';
import { add as addError } from './error';

/* -----------------    ACTION TYPES ------------------ */

const FETCH_ORDERS = 'FETCH_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const REMOVE_ORDER = 'REMOVE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const ADMIN_UPDATE_ORDER = 'ADMIN_UPDATE_ORDER';


/* ------------   ACTION CREATORS     ------------------ */

const fetch = orders => ({ type: FETCH_ORDERS, orders });
const create = order => ({ type: CREATE_ORDER, order });
const remove = id => ({ type: REMOVE_ORDER, id });
const update = order => ({ type: UPDATE_ORDER, order });
const adminUpdate = order => ({ type: ADMIN_UPDATE_ORDER, order });


/* ------------       REDUCER     ------------------ */


// QUESTION!!: SHOULD WE MAKE A CURRENT CART/ORDER STATE?
export default (orders = [], action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return action.orders;

    case CREATE_ORDER:
      return [action.order, ...orders];

    case REMOVE_ORDER:
      return orders.filter(order => order.id !== action.id);

    case UPDATE_ORDER:
      return orders.map(order => (
        action.order.id === order.id ? action.order : order
      ));

    case ADMIN_UPDATE_ORDER:
      return orders.map(order => (
        action.order.id === order.id ? action.order : order
      ));

    default:
      return orders;
  }
};
/* ------------   THUNK CREATORS     ------------------ */
export const fetchOrders = () => (dispatch) => {
  axios.get('/api/orders')
    .then(res => dispatch(fetch(res.data)))
    .catch(err => dispatch(addError(err.response.statusText)));
};

// optimistic
export const removeOrder = id => (dispatch) => {
  dispatch(remove(id));
  axios.delete(`/api/orders/${id}`)
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Removing order: ${id} unsuccesful`, err)
    });
};

export const addOrder = order => (dispatch) => {
  axios.post('/api/orders', order)
    .then((res) => {
      dispatch(create(res.data))
      dispatch(updateID(res.data.id))
    })
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Creating order: ${order} unsuccesful`, err)
    });
};

export const updateOrder = (id, order) => (dispatch) => {
  axios.put(`/api/orders/${id}`, order)
    .then((res) => {
      dispatch(update(res.data))
    })
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Updating order: ${order} unsuccesful`, err)
    });
};

export const purchaseOrder = (id, shipping, order) => (dispatch) => {
  axios.put(`/api/orders/${id}`, order)
    .then((res) => {
      dispatch(update(res.data))
    })
    .then(() => axios.put(`/api/orders/${id}/shipping`, shipping))
    .then(() => dispatch(clearCart()))
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Updating order: ${shipping} unsuccesful`, err)
    });
};


// ADMIN THUNKS

export const adminUpdateOrder = (id, order) => (dispatch) => {
  axios.put(`/api/admin/orders/${id}`, order)
    .then((res) => {
      dispatch(adminUpdate(res.data))
    })
    .catch((err) => {
      dispatch(addError(err.response.statusText))
      console.error(`Updating order: ${order} unsuccesful`, err)
    });
};
