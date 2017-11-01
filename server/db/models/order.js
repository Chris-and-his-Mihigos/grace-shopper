const Sequelize = require('sequelize')
const db = require('../db')

  /* QUESTION 1:

    -need additional model for cart? Or is it sufficient to differentiate based on 'isPurchased' field (true = order, false = cart)

    -best way to persist cart by working with sessionId and userId ...
        example:
          -logged-in user adds 3 items to cart
          -user logs out
          -without closing the session, user adds 2 items to cart while logged-out
          -user logs in again
          -how do we make the cart have all 5 items upon log-in?
  */

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
    validate: {
    }
  },
  sessionId: {
    type: Sequelize.STRING,
    validate: {
    }
  },
  hasShipped: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
    }
  },
  hasArrived: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
    }
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
    }
  },
  userId: {
    type: Sequelize.STRING,
    validate: {
    }
  },
  isCancelled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
    }
  }
},
{
  hooks: {
    //Write methods here
  },
  getterMethods: {
    //Write methods here
  },
  setterMethods: {
    //Write methods here
  },
  instanceMethods: {
    //Write methods here
  },
  classMethods: {
    //Write methods here
  },

})

module.exports = Order
