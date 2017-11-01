/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Review = require('./review');
const Product = require('./product');
const User = require('./user');

describe('Review model definition', () => {
  const review = {
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
    tags: ['chill'],
  }

  beforeEach(() =>
    db.sync({ force: true })
      .then(() => User.create(user))
      .then(() => Product.create(product))
      .then(() => Review.create(review)))

  describe('review body', () => {
    it('should contain text', () => {
      expect(review.text).to.be.equal('Wow this is actually the worst!')
    })
  })

  describe('review rating', () => {
    it('should be an integer between 0 and 5, inclusive', () => {
      expect(review.rating).to.be.equal(0)
    })
  })

  describe('productId', () => {
    it('should be an integer indicating the product that has been reviewed', () => {
      expect(review.productId).to.be.equal(1)
    })
  })

  describe('userId', () => {
    it('should be an integer indicating the user who wrote the review', () => {
      expect(review.userId).to.be.equal(1)
    })
  })
})
