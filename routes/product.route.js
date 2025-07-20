const router = require('express').Router();

const productController = require('../controllers/product.controller');

router.get('/:id',  productController.getProduct);

router.get('/', productController.redirectToHomePage);

module.exports = router;