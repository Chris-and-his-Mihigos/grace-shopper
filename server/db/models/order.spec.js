/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Order = require('./order');

describe('Order model definition', () => {
  const order = {
    items: [{
      releaseTitle: 'Amazing Title',
      artists: ['Great Artist'],
      genre: 'Jazz',
      releaseYear: 2017,
      imageUrl: 'http://image.com',
      songsInfo: [{ title: 'Example Title', duration: '3:30 ' }],
      label: 'Best Label',
      inventory: 100,
      tags: ['chill'],
    }],
    sessionId: 17091,
    hasShipped: false,
    hasArrived: false,
    isPurchased: false,
    userId: 1,
    isCancelled: false,
  }

  beforeEach(() =>
    db.sync({ force: true })
      .then(() => Order.create(order)));

  describe('items', () => {
    it('should be an array of objects indicating the records to be purchased', () => {
      expect(order.items[0]).to.be.an('object')
      expect(order.items[0].releaseTitle).to.be.equal('Amazing Title')
    })
  })

  describe('sessionId', () => {
    it('should be a number indicating the current session', () => {
      expect(order.sessionId).to.be.a('number')
      expect(order.sessionId).to.be.equal(17091)
    })
  })

  describe('hasShipped', () => {
    it('should be a boolean indicating if an order has been shipped', () => {
      expect(order.hasShipped).to.be.a('boolean')
      expect(order.hasShipped).to.be.equal(false)
    })
  })

  describe('hasArrived', () => {
    it('should be a boolean indicating if an order has been delivered', () => {
      expect(order.hasArrived).to.be.a('boolean')
      expect(order.hasArrived).to.be.equal(false)
    })
  })

  describe('isPurchased', () => {
    it('should be a boolean indicating if an order has been purchased', () => {
      expect(order.isPurchased).to.be.a('boolean')
      expect(order.isPurchased).to.be.equal(false)
    })
  })

  describe('isCancelled', () => {
    it('should be a boolean indicating if an order has been cancelled', () => {
      expect(order.isCancelled).to.be.a('boolean')
      expect(order.isCancelled).to.be.equal(false)
    })
  })

  describe('userId', () => {
    it('should be a number indicating the user who made the order', () => {
      expect(order.userId).to.be.a('number')
      expect(order.userId).to.be.equal(1)
    })
  })
})
