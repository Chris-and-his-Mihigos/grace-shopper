import React from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom'


const Home = () => (
  <div>
    <Segment
      inverted
      textAlign="center"
      style={{ minHeight: 500, maxHeight: 500, padding: '1em 0em' }}
      vertical
      id="videoSegment"
    >
      {
        // BEN, I DID A VIDEO THING AGAIN. IT WORKS. I JUST HAVE NO IDEA WHAT I DID 
        // AND I KNOW THAT I NEED TO REFACTOR THIS. THE MAJORITY OF THE CSS RULES ARE IN INDEX.SCSS.
      }
      <div id="videoDiv">
        <div id="videoBlock">
          <div id="videoMessage">
            <Header
              as="h1"
              content="Maximal Records"
              inverted
              className="textoverlay"
              style={{
                fontSize: '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '3em',
              }}
            />
            <Header
              as="h2"
              content="-Old School Tech, New School Sound."
              inverted
              className="textoverlay"
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <Button primary size="huge" className="textoverlay" as={Link} to="/allalbums">
              See Albums
              <Icon name="right arrow" />
            </Button>
          </div>

          <video preload id="video" autoPlay loop>
            <source src="RecordPlayer.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              SUPER DISCOUNT ON ALBUMS THAT START WITH THE LETTER X
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              List of Albums that start with some other letter
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              1-HOUR SHIPPING
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, you thought it was the stuff of dreams, but
              we're just that good.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image bordered rounded size="large" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              "What a Company"
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              That is what they all say about us
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              "Nobody is better."
            </Header>
            <p style={{ fontSize: '1.33em' }}>Willy</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
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
  </div>
);

export default Home;
