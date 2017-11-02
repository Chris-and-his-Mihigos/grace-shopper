import React from 'react';
import {
  Button,
  Grid,
  Header,
  Image,
  Select,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Title from './title.jsx'
import CartPricing from './cartpricing.jsx'

const Cart = props => (
  <div>
    {
      // Shopping Cart header
    }
    <Title title="Shopping Cart" />

    {
      // Item Card
    }
    <div className="itemCardWrapper">
      <div className="cartSectionWrapper">
        <div className="containerDivForCartItem">
          <Grid
            stretched
            columns={3}
            verticalAlign="middle"
            centered
            className="itemcard"
          >
            <Grid.Column className="cartleftgrid" textAlign="center">
              <Header as="h1">Abbey Road</Header>
              <p>1969</p>
              <p>Artists</p>
            </Grid.Column>
            <Grid.Column>
              <Image
                size="small"
                src="abbey_road.jpg"
                label={{
                  as: 'a',
                  size: 'large',
                  color: 'green',
                  content: '$20',
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
              <Button secondary>Remove</Button>
            </Grid.Column>
          </Grid>
        </div>

        <div className="containerDivForCartItem">
          <Grid
            stretched
            columns={3}
            verticalAlign="middle"
            centered
            className="itemcard"
          >
            <Grid.Column className="cartleftgrid" textAlign="center">
              <Header as="h1">Abbey Road</Header>
              <p>1969</p>
              <p>Artists</p>
            </Grid.Column>
            <Grid.Column>
              <Image
                size="small"
                src="abbey_road.jpg"
                label={{
                  as: 'a',
                  size: 'large',
                  color: 'green',
                  content: '$20',
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
              <Button secondary>Remove</Button>
            </Grid.Column>
          </Grid>
        </div>
        <div className="containerDivForCartItem">
          <Grid
            stretched
            columns={3}
            verticalAlign="middle"
            centered
            className="itemcard"
          >
            <Grid.Column className="cartleftgrid" textAlign="center">
              <Header as="h1">Abbey Road</Header>
              <p>1969</p>
              <p>Artists</p>
            </Grid.Column>
            <Grid.Column>
              <Image
                size="small"
                src="abbey_road.jpg"
                label={{
                  as: 'a',
                  size: 'large',
                  color: 'green',
                  content: '$20',
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
              <Button secondary>Remove</Button>
            </Grid.Column>
          </Grid>
        </div>
        <div className="containerDivForCartItem">
          <Grid
            stretched
            columns={3}
            verticalAlign="middle"
            centered
            className="itemcard"
          >
            <Grid.Column className="cartleftgrid" textAlign="center">
              <Header as="h1">Abbey Road</Header>
              <p>1969</p>
              <p>Artists</p>
            </Grid.Column>
            <Grid.Column>
              <Image
                size="small"
                src="abbey_road.jpg"
                label={{
                  as: 'a',
                  size: 'large',
                  color: 'green',
                  content: '$20',
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
              <Button secondary>Remove</Button>
            </Grid.Column>
          </Grid>
        </div>
        <div className="containerDivForCartItem">
          <Grid
            stretched
            columns={3}
            verticalAlign="middle"
            centered
            className="itemcard"
          >
            <Grid.Column className="cartleftgrid" textAlign="center">
              <Header as="h1">Abbey Road</Header>
              <p>1969</p>
              <p>Artists</p>
            </Grid.Column>
            <Grid.Column>
              <Image
                size="small"
                src="abbey_road.jpg"
                label={{
                  as: 'a',
                  size: 'large',
                  color: 'green',
                  content: '$20',
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
              <Button secondary>Remove</Button>
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <div id="checkoutButtons">
      <CartPricing subtotal="46" />

      </div>
    </div>
    {
      // Checkout Segment
    }
  </div>
);

const mapState = ({ products }) => ({ products });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
