const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductModel = require('./ProductModel'); 
const CategoryModel = require('./CategoryModel');

const ProductCategoryModel = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductModel, 
      key: 'id',
    },
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CategoryModel, 
      key: 'id',
    },
    primaryKey: true, 
  },
}, {
  timestamps: false,
  tableName: 'produtos_categorias', 
});


ProductCategoryModel.belongsTo(ProductModel, {
  foreignKey: 'product_id',
  as: 'product',
});


ProductCategoryModel.belongsTo(CategoryModel, {
  foreignKey: 'category_id',
  as: 'category',
});

module.exports = ProductCategoryModel;
