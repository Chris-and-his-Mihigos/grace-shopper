const router = require('express').Router();
const { Order } = require('../../db/models');

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(order => res.json(order))
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body))
    .then(order => res.status(201).send(order))
    .catch(next);
})
