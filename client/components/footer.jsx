import React from 'react';
import {
  Container,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';

const Footer = props => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="About" />
            <List link inverted>
              <List.Item as="a">Contact</List.Item>
              <List.Item as="a">About Us</List.Item>
              <List.Item as="a">Careers</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as="h4" content="Policies" />
            <List link inverted>
              <List.Item as="a">Shipping</List.Item>
              <List.Item as="a">Returns</List.Item>
              <List.Item as="a">Cancelling an Order</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              Some sweet sweet music quote
            </Header>
            <p>The bestest music quote in the world.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
