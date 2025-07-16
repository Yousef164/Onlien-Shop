const router = require('express').Router();

const productController = require('../controller/product.controller');

router.get('/:id',  productController.getProduct);

router.get('/', productController.redirectToHomePage);

module.exports = router;