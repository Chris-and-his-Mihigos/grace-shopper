import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCart, addToCart } from '../store/cart';

const AlbumCard = (props) => {
  const {
    product, cart, handleSubmit, cartId, user, session, isAdmin
  } = props;
  let redirect;
  if (isAdmin) {
    redirect = `admin/album/${product.id}`;
  } else { redirect = `/album/${product.id}` }
  return (
    <Card>
      <a href={redirect}>
        <Image
          src={product.image}
          label={{
            size: 'large',
            color: 'green',
            content: `$${product.price}.00`,
            icon: 'money',
            ribbon: true,
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

        {product.inventory <= 0 ?
          <div>
            <Button color="red" disabled>
              <Icon name="dont" />
              Sorry, this album is out of stock!
        </Button>
          </div>
          :
          <div>
            {cart[0] &&
              cart[0].items.filter(item => +item.product.id === product.id).length ?
                <Button color="green" disabled>
                  <Icon name="add to cart" />
                  Already in Cart!
          </Button>
               :
                <Button
                  onClick={(event) => {
                    handleSubmit(event, product, cart, cartId, user, session);
                  }}
                >
                  <Icon name="add to cart" />
                  Add to Cart
          </Button>
              }
          </div>

        }
      </Card.Content>
    </Card>
  );
};

const mapState = state => ({
  cart: state.cart,
  cartId: state.cartId,
  user: state.user,
  session: state.sessionId,
  isAdmin: !!state.user.id && state.user.isAdmin,
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
