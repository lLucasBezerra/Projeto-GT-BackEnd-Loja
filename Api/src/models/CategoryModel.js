const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoryModel = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    tableName: "categorias"
  });
  module.exports = CategoryModel