/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db/db');
const app = require('../index');

const Product = require('../db/models/product');

describe('Product routes', () => {

  describe('/api/products/', () => {
    const exampleProduct = {
      releaseTitle: 'Amazing Title',
      artists: ['Great Artist'],
      genre: 'Jazz',
      releaseYear: '2017',
      imageUrl: 'http://image.com',
      songsInfo: [{ title: 'Example Title', duration: '3:30 ' }],
      label: 'Best Label',
      inventory: 100,
      tags: ['chill'],
    }

    const exampleProduct2 = {
      releaseTitle: 'Amazing Title2',
      artists: ['Great Artist'],
      genre: 'Jazz',
      releaseYear: '2017',
      imageUrl: 'http://image.com',
      songsInfo: [{ title: 'Example Title', duration: '3:30 ' }],
      label: 'Best Label',
      inventory: 100,
      tags: ['chill'],
    }

    beforeEach(() =>
      db.sync({ force: true })
        .then(() => Product.create(exampleProduct)));

    describe('GET products', () => {
      it('should fetch all products', () => request(app)
        .get('/api/products')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].releaseTitle).to.be.equal('Amazing Title')
        }))
    })

    describe('POST /products/:productId', () => {
      it('should create a new product', () => request(app)
        .post('/api/products')
        .send(exampleProduct2)
        .expect(201)
        .then((res) => {
          expect(res.body.releaseTitle).to.equal('Amazing Title2');
        }))
    })

    describe('PUT /products/:productId', () => {
      it('should update an existing product', () => request(app)
        .put('/api/products/1')
        .send({
          releaseTitle: 'New Title',
          artists: ['New Artist'],
          genre: 'Electronic',
          releaseYear: '1993',
          imageUrl: 'http://image.com',
          songsInfo: [{ title: 'Example Title', duration: '3:30 ' }],
          label: 'New Label',
          inventory: 1,
          tags: ['deep'],
        })
        .expect(201)
        .then((res) => {
          expect(res.body.releaseTitle).to.equal('New Title');
          expect(res.body.artists).to.deep.equal(['New Artist']);
          expect(res.body.genre).to.equal('Electronic');
          expect(res.body.releaseYear).to.equal('1993');
        }))
    })

    describe('DELETE /products/:productId', () => {
      it('should delete a product', () => request(app)
        .delete('/api/products/1')
        .expect(204))
    })
  })
})
