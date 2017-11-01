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
  Item,
  Icon,
  Select,
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
      Put checkout button stuff here
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
