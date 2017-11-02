/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Review = require('./review');
const Product = require('./product');
const User = require('./user');

describe('Review model definition', () => {
  const review1 = {
    text: 'Wow this is actually the worst!',
    rating: 0,
    productId: 1,
    userId: 1,
  }

  const user = {
    email: 'ben@ben.ben',
    password: '123',
  };

  const product = {
    releaseTitle: 'Amazing Title',
    artists: ['Great Artist'],
    genre: 'Jazz',
    releaseYear: '2017',
    imageUrl: 'http://image.com',
    songsInfo: [{ title: 'Example Title', duration: '3:30' }],
    label: 'Best Label',
    inventory: 100,
    price: 10,
    tags: ['chill'],
  }

  beforeEach(() =>
    db.sync({ force: true })
      .then(() => User.create(user))
      .then(() => Product.create(product))
      .then(() => Review.create(review1)))

  describe('save valid review body', () => {
    it('should contain text between 20 and 300 characters', () => {
      expect(review1.text).to.be.a('string')
      expect(review1.text).to.be.equal('Wow this is actually the worst!')
    })
  })

  describe('save invalid review body', () => {
    it('should throw a validation error if review is too short', (done) => {
      const review2 = {
        text: 'Bad!',
        rating: 0,
        productId: 1,
        userId: 1,
      };
      Review.create(review2)
        .then((err) => {
          expect(err.message).to.be.equal('Validation error: review must contain at least 20 characters')
        })
        .catch(err => (err));
      done();
    })

    it('should throw a validation error if review is too long', (done) => {
      const review3 = {
        text: 'Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad! Bad!Bad!',
        rating: 0,
        productId: 1,
        userId: 1,
      };
      Review.create(review3)
        .then((err) => {
          expect(err.message).to.be.equal('Validation error: review cannot contain more than 300 characters')
        })
        .catch(err => (err));
      done();
    })
  })

  describe('save valid review rating', () => {
    it('should be an integer between 0 and 5, inclusive', () => {
      expect(review1.rating).to.be.equal(0)
    })
  })

  describe('save invalid review rating', () => {
    it('should throw a validation error if rating is not between 0 and 5', (done) => {
      const review4 = {
        text: 'Amaaaaaaaaaaaaaaaaazing! So good. I want to give this 11 stars.',
        rating: 11,
        productId: 1,
        userId: 1,
      };
      Review.create(review4)
        .then((err) => {
          expect(err.message).to.be.equal('Validation error: rating must be between 0 and 5')
        })
        .catch(err => (err));
      done();
    })
  })

  describe('productId', () => {
    it('should be an integer indicating the product that has been reviewed', () => {
      expect(review1.productId).to.be.equal(1)
    })

    it('can only be associated with an existing product', (done) => {
      const review5 = {
        text: 'Wow this is actually the worst!',
        rating: 0,
        productId: 5,
        userId: 1,
      };
      Review.create(review5)
        .then((err) => {
          expect(err.message).to.be.equal('Validation error: productId does not exist')
        })
        .catch(err => (err));
      done();
    })
  })

  describe('userId', () => {
    it('should be an integer indicating the user who wrote the review', () => {
      expect(review1.userId).to.be.equal(1)
    })

    it('can only be associated with an existing product', (done) => {
      const review6 = {
        text: 'Wow this is actually the worst!',
        rating: 0,
        productId: 1,
        userId: 5,
      };
      Review.create(review6)
        .then((err) => {
          expect(err.message).to.be.equal('Validation error: userId does not exist')
        })
        .catch(err => (err));
      done();
    })
  })
})
