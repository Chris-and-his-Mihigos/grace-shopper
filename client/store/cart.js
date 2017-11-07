import axios from 'axios';
import { addOrder, updateOrder } from './orders';
import { add as addError } from './error';

/* -----------------    ACTION TYPES ------------------ */

const FETCH_CARTS = 'FETCH_CARTS';
const CREATE_CART = 'CREATE_CART';
const REMOVE_CART = 'REMOVE_CART';
const UPDATE_CART = 'UPDATE_CART';
const CART_ID = 'CART_ID';
const CLEAR_CART = 'CLEAR_CART';

/* ------------   ACTION CREATORS     ------------------ */

const fetch = cart => ({ type: FETCH_CARTS, cart });
const create = cart => ({ type: CREATE_CART, cart });
const remove = id => ({ type: REMOVE_CART, id });
const update = cart => ({ type: UPDATE_CART, cart });
const cartId = id => ({ type: CART_ID, id });
const clear = () => ({ type: CLEAR_CART });
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

    case CLEAR_CART:
      return [];

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
//QUESTION: Step 4. Fetch cart is run using either the user.Id returned from the /auth/me call or using the session if no user found.
// Step 5 is in /server/api/cart.
//Step 6 is then sets the cart and cart id state objects using the data returned from the api call to api/cart.
export const fetchCart = user => (dispatch) => {
  let fetchId;
  if (user.id) fetchId = user.id
  else fetchId = user
  axios.get(`/api/cart/${fetchId}`)
    .then((res) => {
      if ((res.data).length) {
        dispatch(fetch(res.data[0]))
        dispatch(cartId(res.data[0].id))
      }
    })
    .catch((err) => {
      dispatch(addError(err))
      console.error('Unsuccessful')
    });
};

// optimistic
export const removeCart = (id, cartId, cart) => (dispatch) => {
  dispatch(remove(id));
  dispatch(updateOrder(cartId, Object.assign({}, cart)))
};

export const addCart = cart => (dispatch) => {
  dispatch(create(cart))
  dispatch(addOrder(cart))
};

export const addToCart = (id, cart) => (dispatch) => {
  dispatch(create(cart));
  dispatch(updateOrder(id, Object.assign({}, cart)))
}

export const updateCart = (id, cart) => (dispatch) => {
  dispatch(update(cart))
  dispatch(updateOrder(id, Object.assign({}, cart)))
};

export const updateID = id => (dispatch) => {
  dispatch(cartId(id))
}

export const clearCart = () => (dispatch) => {
  dispatch(clear())
  dispatch(cartId(0))
}
