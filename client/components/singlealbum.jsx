import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCart, updateCart } from '../store/cart';
import CartItem from './cartitem.jsx';
import AlbumCard from './albumcard.jsx';
// const fakeAlbum = {id: 1, releaseTitle: "gamivzed", artists: Array(1), genre: "classical", releaseYear: "1978"}

const SingleAlbum = (props) => {
  const album = props.album || {}
  return (
    <div>
      {album && album.id }
    </div>
  );
};

const mapState = (state, ownProps) => {
  const albumId = ownProps.match.params.id;
  const album = state.products.find(product => product.id === +albumId);
  return {
    album,
  };
};

export default connect(mapState)(SingleAlbum);
