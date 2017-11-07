import React from 'react';
import {
  Table,
  Rating,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCart, updateCart, fetchReviews, removeReview } from '../store';
import AlbumCard from './albumcard.jsx';
import ProductReview from './productreview.jsx';

class SingleAlbum extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const albumId = this.props.match.url.substr(7)
    this.props.loadReviews(albumId)
  }

  handleClick(reviewId) {
    this.props.deleteReview(reviewId)
    // console.log('evemt', event)
    // console.log('data', data)
    console.log('review id', reviewId)
  }
  render() {
    const { album, cart, handleSubmit, cartId, reviews } = this.props;
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
              {reviews &&
                reviews.map(review => (
                  <Table.Row key={review.id}>
                    <Table.Cell>
                      <Rating icon="star" defaultRating={review.rating} maxRating={5} disabled />
                    </Table.Cell>
                    <Table.Cell>{review.text}</Table.Cell>
                    {this.props.isLoggedIn && review.userId === this.props.userId ?
                      <Button onClick={() => this.handleClick(review.id)} negative>Delete</Button>
                      : <div />
                    }
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {album && <ProductReview product={album} albumId={album.id} reviews={reviews} />}

      </div>
    )
  }
}


const mapState = (state, ownProps) => {
  const { reviews } = state
  const albumId = ownProps.match.params.id;
  const album = state.products.find(product => product.id === +albumId);
  return {
    album,
    cart: state.cart,
    cartId: state.cartId,
    reviews,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
  };
};

const mapDispatch = dispatch => ({
  loadReviews: (albumId) => {
    dispatch(fetchReviews(albumId))
  },
  deleteReview: (reviewId) => {
    dispatch(removeReview(reviewId))
  },
});
export default connect(mapState, mapDispatch)(SingleAlbum);
