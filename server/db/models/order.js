const Sequelize = require('sequelize')
const db = require('../db')
const Shipping = require('./shipping')

const Order = db.define(
  'order', {
    items: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false,
      validate: {
      },
    },
    sessionId: {
      type: Sequelize.STRING,
      validate: {
      },
    },
    // statuses: cart, hasShipped, hasArrived, isPurchased, isCancelled
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'cart',
    },
    userId: {
      type: Sequelize.STRING,
      validate: {
      },
    },
  },
  {
    hooks: {
      afterCreate: (order) => {
        Shipping.create({ orderId: order.id })
      },
    },
    getterMethods: {
    // Write methods here
    },
    setterMethods: {
    // Write methods here
    },
    instanceMethods: {
    // Write methods here
    },
    classMethods: {
    // Write methods here
    },
  },
)

module.exports = Order
