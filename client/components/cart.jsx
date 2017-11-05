import React from 'react';
import {
  Button,
  Grid,
  Header,
  Image,
  Select,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Title from './title.jsx';
import CartPricing from './cartpricing.jsx';
import CartItem from './cartitem.jsx';


const Cart = (props) => {
  const { cart } = props;
  let val = 0;

  return (
    <div>
      {
        // Shopping Cart header
      }
      <Title title="Shopping Cart" />

      { cart.length ? cart[0].items.forEach((item) => {
      val += (item.product.price * item.qty)
      return val
    }) : null
      }
      <div className="itemCardWrapper">
        <div className="cartSectionWrapper">
          {cart.length ? cart[0].items.map((item, index) => <CartItem key={index} product={item.product} />) : <div />}
        </div>
        <div id="checkoutButtons">
          <CartPricing subtotal={val} />

        </div>
      </div>
      {
        // Checkout Segment
      }
    </div>
  )
};

const mapState = state => ({ products: state.products, cartId: state.cartId, cart: state.cart });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
