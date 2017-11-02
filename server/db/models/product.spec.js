/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Product = require('./product');

describe('Product model definition', () => {
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
      .then(() => Product.create(product)));

  describe('releaseTitle', () => {
    it('should be a string indicating the releaseTitle', () => {
      expect(product.releaseTitle).to.be.a('string')
      expect(product.releaseTitle).to.be.equal('Amazing Title')
    })
  })

  describe('artists', () => {
    it('should be an array of strings containing artist names', () => {
      expect(product.artists).to.be.an('array')
      expect(product.artists[0]).to.be.a('string')
      expect(product.artists[0]).to.be.equal('Great Artist')
    })
  })

  describe('genre', () => {
    it('should be a string indicating the genre', () => {
      expect(product.genre).to.be.a('string')
      expect(product.genre).to.be.equal('Jazz')
    })
  })

  describe('releaseYear', () => {
    it('should be a string indicating the releaseYear', () => {
      expect(product.releaseYear).to.be.a('string')
      expect(product.releaseYear).to.be.equal('2017')
    })
  })

  describe('imageUrl', () => {
    it('should be a string indicating the imageUrl', () => {
      expect(product.imageUrl).to.be.a('string')
      expect(product.imageUrl).to.be.equal('http://image.com')
    })
  })

  describe('songsInfo', () => {
    it('should be an array of JSON', () => {
      expect(product.songsInfo).to.be.an('array')
      expect(product.songsInfo[0]).to.be.an('object')
      expect(product.songsInfo[0].title).to.be.equal('Example Title')
      expect(product.songsInfo[0].duration).to.be.equal('3:30')
    })
  })

  describe('label', () => {
    it('should be a string indicating the label', () => {
      expect(product.label).to.be.a('string')
      expect(product.label).to.be.equal('Best Label')
    })
  })

  describe('inventory', () => {
    it('should be a number indicating the inventory count', () => {
      expect(product.inventory).to.be.a('number')
      expect(product.inventory).to.be.equal(100)
    })
  })

  describe('tags', () => {
    it('should be an array of strings containing relevant tags', () => {
      expect(product.tags).to.be.an('array')
      expect(product.tags[0]).to.be.a('string')
      expect(product.tags[0]).to.be.equal('chill')
    })
  })
})
