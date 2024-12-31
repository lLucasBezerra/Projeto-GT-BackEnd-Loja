const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductModel = require('./ProductModel'); // Relacionando com o ProductModel

const ProductOptionModel = sequelize.define('ProductOption', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    defaultValue: 'square',
    allowNull: true,
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    defaultValue: 'text',
    allowNull: true,
  },
  values: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Não estamos usando timestamps
  tableName: 'opcoes_produto', // Nome da tabela
});

// Relacionamento entre ProductOption e Product
ProductOptionModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
  as: 'product', // Nome da relação
});

module.exports = ProductOptionModel;
