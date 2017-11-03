import axios from 'axios';
import { addOrder, updateOrder, removeOrder } from './orders';

/* -----------------    ACTION TYPES ------------------ */

const FETCH_CARTS = 'FETCH_CARTS';
const CREATE_CART = 'CREATE_CART';
const REMOVE_CART = 'REMOVE_CART';
const UPDATE_CART = 'UPDATE_CART';
const CART_ID = 'CART_ID';
/* ------------   ACTION CREATORS     ------------------ */

const fetch = cart => ({ type: FETCH_CARTS, cart });
const create = cart => ({ type: CREATE_CART, cart });
const remove = id => ({ type: REMOVE_CART, id });
const update = cart => ({ type: UPDATE_CART, cart });
const cartId = id => ({ type: CART_ID, id })
/* ------------       REDUCER     ------------------ */


export const cart = (carts = [], action) => {
  switch (action.type) {
    case FETCH_CARTS:
      return [action.cart];

    case CREATE_CART:
      return [action.cart];

    case REMOVE_CART:
      return [Object.assign({}, carts[0], { items: carts[0].items.filter(item => item.product.id !== action.id) })];

    case UPDATE_CART:
      return carts.map(cart => (
        action.cart.id === cart.id ? action.cart : cart
      ));

    default:
      return carts;
  }
};

export const cartIDred = (cartID = 0, action) => {
  switch (action.type) {
    case CART_ID:
      return action.id

    default:
      return cartID
  }
}


/* ------------   THUNK CREATORS     ------------------ */

export const fetchCart = cart => (dispatch) => {
  axios.get(`/api/orders/${cart.id}`)
    .then(res => dispatch(fetch(res.data)));
};

// optimistic
export const removeCart = id => (dispatch) => {
  dispatch(remove(id));
};

export const addCart = cart => (dispatch) => {
  dispatch(create(cart))
  dispatch(addOrder(cart))
};

export const updateCart = (id, cart) => (dispatch) => {
  dispatch(update(cart))
  dispatch(updateOrder(id, cart))
};

export const updateID = id => (dispatch) => {
  dispatch(cartId(id))
}
