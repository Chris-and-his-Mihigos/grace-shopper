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
} from 'semantic-ui-react';

// This component requires a subtotal prop and an object context prop
// Pass it down as subtotal={whatever refers to the total price of the albums}
// and context={whatever object you want the module stuck to}

const CartPricing = props => (
  <Sticky context={document.getElementById('app')}>
    <Table inverted>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Subtotal<br /><br /></Table.Cell>
          <Table.Cell>{`$${(props.subtotal * 1).toFixed(2)}`}<br /><br /></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Tax<br /><br /></Table.Cell>
          <Table.Cell>{`$${(props.subtotal * 0.08).toFixed(2)}`}<br /><br /></Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell>Total<br /><br /></Table.HeaderCell>
          <Table.HeaderCell>{`$${(props.subtotal * 1.08).toFixed(2)}`}<br /><br />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
    <Button positive size="massive"><Icon name="lock" size="large" />     Checkout</Button>

  </Sticky>
);

export default CartPricing;
