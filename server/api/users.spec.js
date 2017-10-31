/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db/db');
const app = require('../index');

const User = require('../db/models/user');

describe('User routes', () => {

  describe('/api/users/', () => {
    const exampleUser = { email: 'ben@ben.ben' };

    beforeEach(() =>
      db.sync({ force: true })
        .then(() => User.create(exampleUser)));

    describe('GET /users', () => {
      it('should fetch all users', () => request(app)
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal('ben@ben.ben');
        }))
    })

    describe('POST /users/:userId', () => {
      it('should create a new user', () => request(app)
        .post('/api/users')
        .send({ email: 'zeke@zeke.zeke' })
        .expect(201)
        .then((res) => {
          expect(res.body.email).to.equal('zeke@zeke.zeke');
        }))
    })

    describe('PUT /users/:userId', () => {
      it('should update an existing user', () => request(app)
        .put('/api/users/1')
        .send({ email: 'zeke@zeke.zeke' })
        .expect(201)
        .then((res) => {
          expect(res.body.email).to.equal('zeke@zeke.zeke');
        }))
    })

    describe('DELETE /users/:userId', () => {
      it('should delete a user', () => request(app)
        .delete('/api/users/1')
        .expect(204))
    })
  })
})
