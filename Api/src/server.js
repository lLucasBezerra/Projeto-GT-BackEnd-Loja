const sequelize = require('./config/database')
const express = require('express')
const UserModel = require('./models/UserModel');
const CategoryModel = require("./models/CategoryModel")
const ProductModel = require("./models/ProductModel")
const ImageProductModel = require("./models/ProductImageModel")
const ProductOptionModel = require('./models/ProductOptionsModel');
const ProductCategory = require("./models/ProductsCategoryModel")
const app = require('./app');
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() =>{
    app.listen(PORT, 'localhost', () => {
        console.log("Servidor Rodando . . .")
    })
})
