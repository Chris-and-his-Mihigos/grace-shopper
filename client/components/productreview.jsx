import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { addReview, createR, fetchReviews } from '../store'
import {
  Rating,
  Button,
  Form,
  Segment,
  Message,
} from 'semantic-ui-react';

class ProductReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      rating: 5,
    }
    this.handleRatingChange = this.handleRatingChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();
    const { handleSubmit, albumId, userId } = this.props
    handleSubmit(userId, albumId, this.state, this)
    event.target.text.value = '';
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }
  handleRatingChange(e, data) {
    this.setState({ rating: data.rating })
  }

  render() {
    const {
 albumId, handleSubmit, userId, review, reviews
} = this.props
    const userReview = reviews.filter(el => el.userId === userId)[0]
    return (
      <div>
        {this.props.isLoggedIn ?
          <div>
            <br />
            {!userReview ?

              <Segment inverted>
                <Form inverted onSubmit={this.onSubmit} label="Review Item" >
                  <Form.Group widths="equal">
                    <Form.Input as={Rating} name="rating" maxRating={5} defaultRating={5} icon="star" size="large" onRate={this.handleRatingChange} />
                    <Form.TextArea name="text" placeholder="Leave a review" onChange={this.handleTextChange} />
                  </Form.Group>
                  <Button type="submit">Submit Review</Button>
                </Form>
              </Segment>

              :

              <Message positive compact>
                <Message.Header>You have reviewed this product!</Message.Header>
                <p>Delete your previous review to post a new review</p>
              </Message>

            }
            <br />
          </div>
          :
          <div>
            <br />
            <Message negative compact>
              You must be logged in to review an album
            </Message>
            <br />
          </div>
        }
      </div>
    )
  }
}
const mapState = (state, ownProps) => {
  const albumId = ownProps.product.id;
  const album = state.products.find(product => product.id === +albumId);
  const { reviews } = state
  return {
    albumId,
    userId: state.user.id,
    reviews,
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => ({
  handleSubmit: (userId, albumId, state, comp) => {
    const review = {
      text: state.text,
      rating: state.rating,
      userId,
      productId: albumId,
    }
    dispatch(addReview(albumId, review))
    comp.setState({ text: '', rating: 0 })
  },
  loadReviews: (albumId) => {
    dispatch(fetchReviews(albumId))
  },
});

export default connect(mapState, mapDispatch)(ProductReview)
