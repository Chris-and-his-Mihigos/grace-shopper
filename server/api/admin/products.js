const router = require('express').Router();
const { Product, User } = require('../../db/models');

module.exports = router

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next);
});

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => product.update(req.body))
    .then(product => res.status(201).send(product))
    .catch(next);
});

router.delete('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => product.destroy())
    .then(() => res.status(204).end())
    .catch(next);
});
