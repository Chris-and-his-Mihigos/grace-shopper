const router = require('express').Router()
const { Order } = require('../db/models')

module.exports = router


router.get('/:Id', (req, res, next) => {
  Order.findAll({
    where: {
      $or: [{
        userId: req.params.Id,
        status: 'cart',
      },
      {
        sessionId: req.session.sessionId,
        status: 'cart',
      },
      ],
    },
    attributes: ['items', 'sessionId', 'status', 'userId', 'id'],
  })
    .then((order) => {
      res.json(order);
    })
    .catch(next);
});

