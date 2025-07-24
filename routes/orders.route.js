const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const jjj = require('../controllers/cart.controller');
const ordersController = require('../controllers/orders.controller');
const authGuard = require('./guards/auth.guard');

router.get('/', authGuard.isAuth, ordersController.getOrders);

router.post('/', 
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount')
    .notEmpty()
    .withMessage("Amount is required")
    .isInt({min: 1})
    .withMessage("Amount must be grater then 0")
    .custom((value, { req }) => {
      if (req.body.status !== 'false') {
          throw new Error('Can\'t be modified');
      }
      return true;
    }),
    ordersController.postOrders
);

module.exports = router;