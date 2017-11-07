import React from 'react';
import {
  Table,
  Rating,
  Button,
  Form,
  Segment,
  Input,
  Modal,
  Header,
  Icon,
  Divider,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import history from '../history.js';
import { addCart, updateCart, fetchReviews, removeReview, adminUpdateProduct, adminRemoveProduct, fetchProducts } from '../store';
import AdminAlbumCard from './adminalbumcard.jsx';
import ProductReview from './productreview.jsx';

class AdminEditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: [],
      photo: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  componentDidMount() {
    this.props.loadReviews(this.props.albumId)
  }

  handleClick(reviewId) {
    this.props.deleteReview(reviewId)
  }

  handleRemove(e) {
    e.preventDefault()
    this.props.deleteAlbum(this.props.albumId)
    console.log('deleting', this.props.albumId)
    history.push('/allalbums')
  }

  handleSubmit(evt, data) {
    console.log('handling')
    evt.preventDefault();
    const albumUpdate = {
      releaseTitle: evt.target.title.value,
      label: evt.target.label.value,
      price: +evt.target.price.value,
      inventory: +evt.target.inventory.value,
      artists: [evt.target.artists.value],
    }
    if (evt.target.photo.value !== '') {
      albumUpdate.photo = evt.target.photo.value
    }
    console.log('UPDATE', albumUpdate)
    console.log('ID', this.props.albumId)
    this.props.updateAlbum(this.props.albumId, albumUpdate)
    history.push(`/admin/album/${albumId}`)
  }

  render() {
    const {
      album, cart, handleSubmit, cartId, reviews, isAdmin,
    } = this.props;
    return (
      <div id="singlealbumoutercontainer">
        <div id="singlealbuminnercontainer">
          <div />
          {album && <AdminAlbumCard
            product={album}
          />}
          <br />
          <br />

          {album &&
            <Modal trigger={<Button>Edit Product</Button>} closeIcon>
              <Header icon="edit" content="Edit this Product" />
              <Modal.Content>
                <Segment inverted>
                  <Form inverted onSubmit={this.handleSubmit}>
                    <Form.Group widths="equal">
                      <Form.Field name="title" control={Input} label="Title" placeholder={album.releaseTitle} defaultValue={album.releaseTitle} />
                      <Form.Field name="artists" control={Input} label="Artists" placeholder={album.artists[0]} defaultValue={album.artists[0]} />
                    </Form.Group>
                    <Form.Field name="photo" control={Input} label="Photo" defaultValue={album.photo} placeholder="Photo URL" />
                    <Form.Group>
                      <Form.Field name="label" control={Input} label="Label" defaultValue={album.label} placeholder={album.label} width={4} />
                      <Form.Field name="price" control={Input} label="Price $" defaultValue={album.price} placeholder={`$${album.price}`} width={2} />
                      <Form.Field name="inventory" control={Input} label="Inventory" defaultValue={album.inventory} placeholder={album.inventory} width={2} />
                    </Form.Group>

                    <Button
                      type="submit"
                      color="green"
                    >
                      <Icon name="checkmark" /> Update Product
                    </Button>


                    <Button floated="right" color="red" onClick={this.handleRemove}>
                      <Icon name="remove" /> Delete Product
                    </Button>

                  </Form>
                </Segment>
              </Modal.Content>
            </Modal>

          }
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
                    {(this.props.isLoggedIn && review.userId === this.props.userId) || isAdmin ?
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
    albumId,
    cart: state.cart,
    cartId: state.cartId,
    reviews,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.id && state.user.isAdmin,
  };
};

const mapDispatch = dispatch => ({
  loadReviews: (albumId) => {
    dispatch(fetchReviews(albumId))
  },
  deleteReview: (reviewId) => {
    dispatch(removeReview(reviewId))
  },
  updateAlbum: (albumId, albumUpdate) => {
    dispatch(adminUpdateProduct(albumId, albumUpdate))
  },
  deleteAlbum: (albumId) => {
    dispatch(adminRemoveProduct(albumId))
    dispatch(fetchProducts())
  },
});
export default connect(mapState, mapDispatch)(AdminEditProduct);
