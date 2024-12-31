const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CategoryModel = require('./CategoryModel');


const ProductModel = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'produtos',
});


module.exports = ProductModel;