import React from 'react';
import {
  Table,
  Rating,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCart, updateCart } from '../store/cart';
import AlbumCard from './albumcard.jsx';

const SingleAlbum = (props) => {
  const { album, cart, handleSubmit, cartId } = props;
  return (
    <div id="singlealbumoutercontainer">
      <div id="singlealbuminnercontainer">
        <div />
        {album && <AlbumCard product={album} />}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Song Title</Table.HeaderCell>
              <Table.HeaderCell>Length</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {album &&
              album.songsInfo.map((song, index) => (
                <Table.Row key={song.title}>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{song.title}</Table.Cell>
                  <Table.Cell>{song.duration}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Review</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {album &&
              album.users.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <Rating icon="star" defaultRating={user.review.rating} maxRating={5} />
                  </Table.Cell>
                  <Table.Cell>{user.review.text}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  const albumId = ownProps.match.params.id;
  const album = state.products.find(product => product.id === +albumId);
  return {
    album,
    cart: state.cart,
    cartId: state.cartId,
  };
};
export default connect(mapState)(SingleAlbum);
