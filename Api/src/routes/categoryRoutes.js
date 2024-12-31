const express = require('express')
const categoryController = require('../controllers/categoryController')
const router = express.Router()

router.get('/v1/category/search', categoryController.searchCategories);
router.get('/v1/category/:id', categoryController.getCategoryById);
router.post('/v1/category', categoryController.createCategory);
