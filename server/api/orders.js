const router = require('express').Router()
const { Order } = require('../db/models')
const { Shipping } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({})
    .then(order => res.json(order))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then((order) => {
      res.status(201).cookie('cartId', order.id).json(order)
    })
    .catch(next);
});

router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => order.update(req.body))
    .then(order => res.status(201).send(order))
    .catch(next);
});

router.put('/:orderId/shipping', (req, res, next) => {
  Shipping.findOne({
    where: {
      orderId: req.params.orderId,
    },
  })
    .then(shipping => shipping.update(req.body))
    .then(shipping => res.status(201).send(shipping))
    .catch(next);
})
