const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const authGuard = require('./guards/auth.guard');

const cartController = require('../controllers/cart.controller');

router.get('/', authGuard.isAuth, cartController.getCart)

router.post('/',
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .isInt({min: 1})
        .withMessage('Amount must be grater then 0'),
    cartController.postCart

);

router.post('/save',
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount')
    .notEmpty()
    .withMessage("Amount is required")
    .isInt({min: 1})
    .withMessage("Amount must be grater then 0"),
    cartController.postSave
);

router.post('/delete',
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    cartController.postDelete
);

router.post('/deleteAll',
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    cartController.postDeleteAll
)

router.get('/order', authGuard.isAuth, cartController.cartOrders);



module.exports = router;
