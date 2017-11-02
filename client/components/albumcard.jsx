import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCart, updateCart } from '../store/cart';

const AlbumCard = (props) => {
  const {
    product, cart, handleSubmit, cartId,
  } = props;
  return (
    <Card>
      <Image
        src="abbey_road.jpg"
        label={{
          as: 'a',
          size: 'large',
          color: 'green',
          content: `$${product.price}.99`,
          icon: 'money',
          ribbon: true,
        }}
      />
      <Card.Content>
        <Card.Header>{product.releaseTitle}</Card.Header>
        <Card.Meta>
          <span className="date">{product.releaseYear}</span>
        </Card.Meta>
        <Card.Description>
          {product.artists.map(artist => artist)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={event => handleSubmit(event, product, cart, cartId)}><Icon name="add to cart" />
          Add to Cart
        </Button>
      </Card.Content>
    </Card>
  );
};

const mapState = state => ({ cart: state.cart, cartId: state.cartIDred });
const mapDispatch = dispatch => ({
  handleSubmit(event, product, cart, cartId) {
    console.log('cartlen', cart.length)
    console.log(cartId)
    let item;
    event.preventDefault();
    if (!cart.length) {
      item = [{ product, qty: 1 }]
    } else { item = [{ product, qty: 1 }, ...cart[0].items] }
    const order = {
      items: item,
      sessionId: 6994,
      status: 'cart',
      userId: 1,
      cartID: 1,
    }
    console.log('item', order)
    if (cart.length) dispatch(updateCart(cartId, order))
    else dispatch(addCart(order))
  },
})

export default connect(mapState, mapDispatch)(AlbumCard);
