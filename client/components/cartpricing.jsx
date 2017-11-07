import React, { Component } from 'react';
import {
  Grid,
  Header,
  Image,
  Rail,
  Segment,
  Sticky,
  Card,
  Icon,
  Table,
  Button,
  Modal,
  Input,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateCart } from '../store/cart';
import { purchaseOrder } from '../store/orders';
import history from '../history';

// This component requires a subtotal prop and an object context prop
// Pass it down as subtotal={whatever refers to the total price of the albums}
// and context={whatever object you want the module stuck to}

const CartPricing = (props) => {
  const { handleSubmit, cart, cartId } = props;
  return (
    <Sticky context={document.getElementById('app')}>
      <Table inverted>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Subtotal<br />
              <br />
            </Table.Cell>
            <Table.Cell>
              {`$${(props.subtotal * 1).toFixed(2)}`}
              <br />
              <br />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Tax<br />
              <br />
            </Table.Cell>
            <Table.Cell>
              {`$${(props.subtotal * 0.08).toFixed(2)}`}
              <br />
              <br />
            </Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              Total<br />
              <br />
            </Table.HeaderCell>
            <Table.HeaderCell>
              {`$${(props.subtotal * 1.08).toFixed(2)}`}
              <br />
              <br />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <Modal
        trigger={
          <Button positive size="massive">
            <Icon name="lock" size="large" />Checkout
          </Button>
        }
      >
        <Modal.Header>Enter Your Details</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <h3>Shipping Address:</h3>
            <Form onSubmit={event => handleSubmit(event, cartId, cart)}>
              <Input
                fluid
                name="Street"
                label="Street Address"
                placeholder="123 Your Street Lane"
              />
              <br />
              <Input fluid name="City" label="City" placeholder="Chicago" />
              <br />
              <Input fluid name="State" label="State" placeholder="Illinois" />
              <br />
              <Input fluid name="ZipCode" label="Zip Code" placeholder="60607" />
              <br />
              <h3>Email Address:</h3>
              <Input name="email" fluid placeholder="my_email@domain.com" />
              <br />
              <br />
              <br />
              <Button type="submit" size="massive" positive>Purchase</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Sticky>
  );
};

const mapState = (state, ownProps) => ({
  cartId: state.cartId,
  cart: state.cart,
  history: ownProps.history,
});

const mapDispatch = dispatch => ({
  handleSubmit(event, cartId, cart) {
    event.preventDefault();
    const shipping = {
      address: event.target.Street.value,
      city: event.target.City.value,
      state: event.target.State.value,
      zip: event.target.ZipCode.value,
      email: event.target.email.value,
    }
    const order = Object.assign({}, cart[0], {
      status: 'purchased',
    })
    dispatch(purchaseOrder(cartId, shipping, order))
    history.push('/allalbums')
  },
})

export default connect(mapState, mapDispatch)(CartPricing);

