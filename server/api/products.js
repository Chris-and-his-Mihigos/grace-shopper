const router = require('express').Router();
const { Product, User } = require('../db/models');

module.exports = router;


router.get('/', (req, res, next) => {
  Product.findAll({ include: [{ model: User, attributes: ['id', 'email'], nested: true }] })
    .then(product => res.json(product))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, { include: [{ model: User, attributes: ['id', 'email'], nested: true }] })
    .then(product => res.json(product))
    .catch(next);
});
