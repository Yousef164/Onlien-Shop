const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const authController = require('../controller/auth.controller');

router.get('/signup', authController.getSignup);

router.post('/signup',
    bodyParser.urlencoded({extended: true}),
    check('username').notEmpty().withMessage('Username is required'),
    check('email').notEmpty().isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters long'),
    check('confirmPassword').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw 'Passwords do not match';
        }
        else return true;
    }),
    authController.postSignup
);

router.get('/login', authController.getLogin);

router.post('/login',
    bodyParser.urlencoded({extended: true}),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    authController.postLogin
);

router.all('/logout', authController.logout);

module.exports = router;