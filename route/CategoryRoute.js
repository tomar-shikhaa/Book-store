const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');
const authorization = require('../middleware/Authorization')

router.post('/createcat',  CategoryController.createCategoryBook);
router.get('/getbook/:id', CategoryController.getCategoryById);
router.get('/getallbooks', CategoryController.getCategoryBooks);

module.exports = router;