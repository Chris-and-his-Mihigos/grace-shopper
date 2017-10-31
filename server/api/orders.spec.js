/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db/db');
const app = require('../index');

const Order = require('../db/models/order');

describe('Order routes', () => {
  describe('/api/orders/', () => {
    const exampleOrder = {
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

    const exampleOrder2 = {
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
      sessionId: 17092,
      hasShipped: false,
      hasArrived: false,
      isPurchased: false,
      userId: 1,
      isCancelled: false,
    }

    beforeEach(() =>
      db.sync({ force: true })
        .then(() => Order.create(exampleOrder)));

    describe('/GET orders', () => {
      it('should fetch all orders', () => request(app)
        .get('/api/orders')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].sessionId).to.be.equal('17091');
        }))
    })

    describe('POST /orders/:orderId', () => {
      it('should create a new order', () => request(app)
        .post('/api/orders')
        .send(exampleOrder2)
        .expect(201)
        .then((res) => {
          expect(res.body.sessionId).to.equal('17092');
        }))
    })

    describe('PUT /orders/:orderId', () => {
      it('should update an existing order', () => request(app)
        .put('/api/orders/1')
        .send(exampleOrder2)
        .expect(201)
        .then((res) => {
          expect(res.body.sessionId).to.equal(17092);
        }))
    })
  })
})
