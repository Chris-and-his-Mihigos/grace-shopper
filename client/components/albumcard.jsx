import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const AlbumCard = (props) => {
  const { product } = props;
  return (
    <Card>
      <Image
        src="abbey_road.jpg"
        label={{
          as: 'a',
          size: 'large',
          color: 'green',
          content: `$${product.price}.99`,
          icon: 'money',
          ribbon: true,
        }}
      />
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
        <a>
          <Icon name="add to cart" />
          Add to Cart
        </a>
      </Card.Content>
    </Card>
  );
};

const mapState = ({ state, ownProps }) => ({ state, ownProps });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AlbumCard);
