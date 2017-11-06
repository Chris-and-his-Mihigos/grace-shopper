import React from 'react';
import { Image, Grid, Header, Select, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCart, updateCart } from '../store/cart';


const CartItem = (props) => {
  const { product, handleChange, handleSubmit, cart, cartId } = props;
  return (
    <div className="containerDivForCartItem">
      <Grid
        stretched
        columns={3}
        verticalAlign="middle"
        centered
        className="itemcard"
      >
        <Grid.Column className="cartleftgrid" textAlign="center">
          <Header as="h1">{product.releaseTitle}</Header>
          <p>{product.releaseYear}</p>
          <p> {product.artists.map(artist => artist)}</p>
        </Grid.Column>
        <Grid.Column>
          <Image
            size="small"
            src={product.image}
            label={{
              as: 'a',
              size: 'large',
              color: 'green',
              content: `$${product.price}.00`,
              icon: 'money',
              ribbon: true,
            }}
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Select
            onChange={(event, data) => handleChange(event, product.id, cart, cartId, data)}
            placeholder="Select a quantity"
            options={[1, 2, 3, 4, 5].map(num => ({
              text: num,
              value: num,
            }))}
          />
          <Button onClick={event => handleSubmit(event, product.id, cart, cartId)} secondary>Remove</Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapState = state => ({ cartId: state.cartId, cart: state.cart });
const mapDispatch = dispatch => ({
  handleSubmit(event, id, cart, cartId) {
    event.preventDefault();
    const order = Object.assign({}, cart[0], { items: cart[0].items.filter(item => item.product.id !== id) })
    dispatch(removeCart(id, cartId, order))
  },
  handleChange(event, id, cart, cartId, data) {
    event.preventDefault();
    const order = Object.assign({}, cart[0])
    order.items.forEach((item) => {
      if (item.product.id === id) {
        item.qty = data.value;
      }
    })
    dispatch(updateCart(cartId, order))
  },
})

export default connect(mapState, mapDispatch)(CartItem);
