const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const Shipping = require('./shipping')


Product.belongsToMany(User, { through: Review })
User.belongsToMany(Product, { through: Review })
Shipping.belongsTo(Order, { hooks: true })

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Product, Order, Review, Shipping,
}


// in our reviews: userID, text, rating, productID, id
// product, userID
