const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const authController = require('../controller/auth.controller');

router.get('/signup', authController.getSignup);

router.post('/signup',
    bodyParser.urlencoded({extended: true}),
    check('username').notEmpty(),
    check('email').notEmpty().isEmail(),
    check('password').isLength({ min: 6}),
    check('confirmPassword').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw 'Passwords do not match';
        }
        else return true;
    }),
    authController.postSignup
);

router.get('/login', authController.getLogin);

router.post('/login', bodyParser.urlencoded({extended: true}), authController.postLogin);

router.all('/logout', authController.logout);

module.exports = router;