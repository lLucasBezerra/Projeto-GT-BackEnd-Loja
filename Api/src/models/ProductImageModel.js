const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductModel = require('./ProductModel');

const ProductImageModel = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductModel, 
      key: 'id', 
    },
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, 
  tableName: 'imagens_produto',
});

ProductImageModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
  as: 'product',
});

module.exports = ProductImageModel;
