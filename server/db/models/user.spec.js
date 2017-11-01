/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Model Definition', () => {
    const user1 = {
      email: 'ben@ben.ben',
      password: '123',
    };

    beforeEach(() =>
      db.sync({ force: true })
        .then(() => User.create(user1)));

    describe('save valid email', () => {
      it('should be a string indicating a user email', () => {
        expect(user1.email).to.be.a('string')
        expect(user1.email).to.be.equal('ben@ben.ben')
      })
      it('should be unique', (done) => {
        const user2 = {
          email: 'ben@ben.ben',
          password: '321',
        };
        User.create(user2)
          .then((err) => {
            expect(err.message).to.be.equal('Validation error: email must be unique')
          })
          .catch(err => (err));
        done();
      })
    })

    describe('save invalid email', () => {
      it('should throw a validation error', (done) => {
        const user3 = {
          email: 'max.com',
          password: '456',
        };
        User.create(user3)
          .then((err) => {
            expect(err.message).to.be.equal('Validation error: not a valid email address')
          })
          .catch(err => (err));
        done();
      })
    })

    describe('password', () => {
      it('should be a string indicating a the user password', () => {
        expect(user1.password).to.be.a('string')
        expect(user1.password).to.be.equal('123')
      })
    })
  })

  describe('Instance Methods', () => {
    describe('correctPassword', () => {
      let zeke

      beforeEach(() => {
        return User.create({
          email: 'zeke@zeke.zeke',
          password: '123'
        })
          .then(user => {
            zeke = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(zeke.correctPassword('123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(zeke.correctPassword('bonez')).to.be.equal(false)
      })
    })
  })
})
