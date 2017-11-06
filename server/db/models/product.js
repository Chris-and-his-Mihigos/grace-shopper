const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  releaseTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
    }
  },
  artists: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    validate: {
    }
  },
  genre: {
    type: Sequelize.STRING,
    validate: {
    }
  },
  releaseYear: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
    }
  },
  image: {
    type: Sequelize.STRING,
    // defaultValue: 'abbey_road.jpg',
    // validate: {
    //   isUrl: true,
    // }
  },
  songsInfo: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    validate: {
    }
  },
  label: {
    type: Sequelize.STRING,
    validate: {
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
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

module.exports = Product
