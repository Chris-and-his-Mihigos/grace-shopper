import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const FETCH_REVIEWS = 'FETCH_REVIEWS';
const CREATE_REVIEW = 'CREATE_REVIEW';
const REMOVE_REVIEW = 'REMOVE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
/* ------------   ACTION CREATORS     ------------------ */

export const fetchR = reviews => ({ type: FETCH_REVIEWS, reviews });
export const createR = review => ({ type: CREATE_REVIEW, review });
export const removeR = id => ({ type: REMOVE_REVIEW, id });
export const updateR = review => ({ type: UPDATE_REVIEW, review });


/* ------------       REDUCER     ------------------ */

export default (reviews = [], action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return action.reviews;

    case CREATE_REVIEW:
      return [action.review, ...reviews];

    case REMOVE_REVIEW:
      return reviews.filter(review => review.id !== action.id);

    case UPDATE_REVIEW:
      return reviews.map(review => (
        action.review.id === review.id ? action.review : review
      ));

    default:
      return reviews;
  }
};
/* ------------   THUNK CREATORS     ------------------ */

export const fetchReviews = albumId => (dispatch) => {
  axios.get(`/api/reviews/${albumId}`)
    .then((res) => {
      console.log('STORE REVIEWS', res.data)
      return dispatch(fetchR(res.data))
    });
};

// optimistic
export const removeReview = id => (dispatch) => {
  dispatch(removeR(id));
  axios.delete(`/api/reviews/${id}`)
    .catch(err => console.error(`Removing review: ${id} unsuccesful`, err));
};

export const addReview = (albumId, review) => (dispatch) => {
  axios.post('/api/reviews/', review)
    .then(res => dispatch(createR(res.data)))
    .catch(err => console.error(`Creating review: ${review} unsuccesful`, err));
};

export const updateReview = (id, review) => (dispatch) => {
  axios.put(`/api/reviews/${id}`, review)
    .then(res => dispatch(updateR(res.data)))
    .catch(err => console.error(`Updating review: ${review} unsuccesful`, err));
};
