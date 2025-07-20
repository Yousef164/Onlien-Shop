const router = require('express').Router;
const bodyParser = require('body-parser');
const check =require('express-validator')

const authGuard = require('./guards/auth.guard');

const cartController = require('./controllers/cart.controller');

router.post('/',
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount')
        .not.isEmpty()
        .withMessage('Amount is required')
        .isInt({min: 1})
        .withMessage('Amount must be grater then 0')

);



module.exports = router;
