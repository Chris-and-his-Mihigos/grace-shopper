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
import AlbumCard from './albumcard.jsx';

const AllAlbums = (props) => {
  const { products } = props;
  return (
    <div>
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
            content="Albums"
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

      <Card.Group id="albumcards">
        {products.length ?
          products.map(product => <AlbumCard key={product.id} product={product} />) : <div />}
      </Card.Group>
    </div>
  )
};

const mapState = ({ products }) => ({ products })
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllAlbums);

