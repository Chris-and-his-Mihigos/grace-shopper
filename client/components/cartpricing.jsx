import React, { Component } from "react";
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
  Input
} from "semantic-ui-react";

// This component requires a subtotal prop and an object context prop
// Pass it down as subtotal={whatever refers to the total price of the albums}
// and context={whatever object you want the module stuck to}

const CartPricing = props => (
  <Sticky context={document.getElementById("app")}>
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
          <Input
            fluid
            label="Street Address"
            placeholder="123 Your Street Lane"
          />
          <br />
          <Input fluid label="City" placeholder="Chicago" />
          <br />
          <Input fluid label="State" placeholder="Illinois" />
          <br />
          <Input fluid label="Zip Code" placeholder="60607" />
          <br />
          <h3>Email Address:</h3>
          <Input fluid placeholder="my_email@domain.com" />
          <br />
          <br />
          <br />
            <Button size='massive' positive>Purchase</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  </Sticky>
);

export default CartPricing;
