/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { create } from './products';


describe('action creators', () => {
  let product;

  beforeEach(() => {
    product = {
      id: '1',
      title: 'Abbey Road',
      label: 'Apple',
      ReleaseYear: '1969',
    }
  });

  describe('create', () => {
    it('creates a product', () => {
      expect(create(product).product).to.deep.equal(product)
      expect(create(product).type).to.equal('CREATE_PRODUCT')
    })
  })
});
