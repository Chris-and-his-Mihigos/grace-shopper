import React from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
  Segment,
  Card,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const Cart = props => (
  <div>
    {
        // Shopping Cart header
      }
    <Segment
      inverted
      textAlign="center"
      style={{
          paddingBottom: 1,
          paddingTop: 2,
        }}
      vertical
    >
      <Container text>
        <Header
          as="h1"
          content="Shopping Cart"
          inverted
          style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 20,
              padding: '0em 0em',
            }}
        />
      </Container>
    </Segment>

    {
        // Item Card
      }

    {
        // Checkout Segment
      }
  </div>
);

const mapState = ({ products }) => ({ products });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
