const router = require('express').Router()
const { Order } = require('../db/models')

module.exports = router

//QUESTION: Step 5. A call is made to retrieve the instances of Order where either userId matches the params put in with cart status
//or the sessionId matches with status of cart. Step 6 is back in /client/store/cart
router.get('/:Id', (req, res, next) => {
  Order.findAll({
    where: {
      $or: [{
        userId: req.params.Id,
        status: 'cart',
      },
      {
        sessionId: req.session.sessionId, //potential issue, should probably just use req.params.Id;
        status: 'cart',
      },
      ],
    },
    attributes: ['items', 'sessionId', 'status', 'userId', 'id'],
  })
    .then((order) => {
      req.session.cart = order;
      res.json(order);
    })
    .catch(next);
});

