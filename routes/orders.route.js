const router = require('express').Router();
const bodyParser = require('body-parser');

const ordersController = require('../controllers/orders.controller');
const authGuard = require('./guards/auth.guard');

router.get('/', authGuard.isAuth, ordersController.getOrders);

module.exports = router;