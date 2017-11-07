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

// router.post('/', (req, res, next) => {
//   Product.create(req.body)
//     .then(product => res.status(201).json(product))
//     .catch(next);
// });

// router.put('/:productId', (req, res, next) => {
//   Product.findById(req.params.productId)
//     .then(product => product.update(req.body))
//     .then(product => res.status(201).send(product))
//     .catch(next);
// });

// router.delete('/:productId', (req, res, next) => {
//   Product.findById(req.params.productId)
//     .then(product => product.destroy())
//     .then(() => res.status(204).end())
//     .catch(next);
// });
