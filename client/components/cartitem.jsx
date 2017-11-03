import React from 'react';
import { Image, Grid, Header, Select, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {removeCart } from '../store/cart';
import { updateOrder } from '../store/orders';

const CartItem = (props) => {
  const { product, handleSubmit, cart, cartId } = props;
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
            src="abbey_road.jpg"
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
            placeholder="Select a quantity"
            options={[1, 2, 3, 4, 5].map(num => ({
              text: num,
              value: num,
            }))}
          />
          <Button onClick={event => handleSubmit(event, product.id)} secondary>Remove</Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapState = state => ({ cartId: state.cartId, cart: state.cart });
const mapDispatch = dispatch => ({
  handleSubmit(event, id) {
    event.preventDefault();
    dispatch(removeCart(id))
  },
})

export default connect(mapState, mapDispatch)(CartItem);
