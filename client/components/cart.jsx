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
import { fetchProducts } from '../store';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { cart, products } = this.props;
    let val = 0;
    let product;
    return (
      <div>
        {products &&
          <div>
            <Title title="Shopping Cart" />

            {cart.length ? cart[0].items.forEach((item) => {
              product = products.filter(el => el.id === item.product.id)
              val += (product[0].price * item.qty)
              return val
            }) : null
            }
            <div className="itemCardWrapper">
              <div className="cartSectionWrapper">
                {cart.length ? cart[0].items.map((item, index) => {
                  product = products.filter(el => el.id === item.product.id)
                 return <CartItem key={index} product={product[0]} />
                }) : <div />}
              </div>
              <div id="checkoutButtons">
                <CartPricing subtotal={val} />

              </div>
            </div>
          </div>
        }
        {
          // Checkout Segment
        }
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  cartId: state.cartId,
  cart: state.cart,
  state,
});
const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(fetchProducts());
  },
});

export default connect(mapState, mapDispatch)(Cart);
