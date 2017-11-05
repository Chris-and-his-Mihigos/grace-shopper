import React from 'react';
import { Card, Icon, Image, Button, Reveal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCart, addToCart } from '../store/cart';

console.log('black');
const AlbumCard = (props) => {
  const {
    product, cart, handleSubmit, cartId, user, session,
  } = props;
  return (
    <Card>
      <a href={`album/${product.id}`}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Public_image_ltd_album_cover.jpg"
          label={{
            as: 'a',
            size: 'large',
            color: 'green',
            content: `$${product.price}.00`,
            icon: 'money',
            ribbon: true,
            href: `album/${product.id}`,
          }}
        />
      </a>
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
        {cart[0] &&
        cart[0].items.filter(item => +item.product.id === product.id).length ? (
          <Button>
            <Icon name="add to cart" />
            Added to Cart!
          </Button>
        ) : (
          <Button
            onClick={(event) => {
              handleSubmit(event, product, cart, cartId, user, session);
            }}
          >
            <Icon name="add to cart" />
            Add to Cart
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const mapState = state => ({
  cart: state.cart,
  cartId: state.cartId,
  user: state.user,
  session: state.sessionId,
});
const mapDispatch = dispatch => ({
  handleSubmit(event, product, cart, cartId, user, session) {
    event.preventDefault();
    let item;
    if (!cart.length || cart == [[]]) {
      item = [{ product, qty: 1 }];
    } else {
      item = [{ product, qty: 1 }, ...cart[0].items];
    }
    const order = {
      items: item,
      sessionId: session || null,
      status: 'cart',
      userId: user.id || null,
      cartID: cartId,
    };
    if (cart.length) dispatch(addToCart(cartId, order));
    else dispatch(addCart(order));
  },
});

export default connect(mapState, mapDispatch)(AlbumCard);
