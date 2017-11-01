/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Model Definition', () => {
    const user = {
      email: 'ben@ben.ben',
      password: '123',
    };

    beforeEach(() =>
      db.sync({ force: true })
        .then(() => User.create(user)));

    describe('email', () => {
      it('should be a string indicating a valid user email', () => {
        expect(user.email).to.be.a('string')
        expect(user.email).to.be.equal('ben@ben.ben')
      })
    })
    describe('password', () => {
      it('should be a string indicating a the user password', () => {
        expect(user.password).to.be.a('string')
        expect(user.password).to.be.equal('123')
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
