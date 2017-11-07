import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user, { sessionId } from './user';
import orders from './orders';
import products from './products';
import reviews from './reviews';
import { cart, cartIDred as cartId } from './cart';

const reducer = combineReducers({ user, orders, products, cart, reviews, cartId, sessionId });
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true }),
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './orders';
export * from './products';
export * from './reviews';
