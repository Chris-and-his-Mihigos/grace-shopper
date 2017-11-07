const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.TEXT,
    defaultValue: 'This is the best album in the whole wide world',
    validate: {
      len: [0, 300],
    },

  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
    },
  },
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

module.exports = Review
