const router = require('express').Router();
const bodyParser = require('body-parser');
const authGuard = require('./guards/auth.guard');

const check = require('express-validator').check;

const authController = require('../controllers/auth.controller');

router.get('/signup', authGuard.notAuth, authController.getSignup);

router.post('/signup',
    authGuard.notAuth,
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

router.get('/login', authGuard.notAuth, authController.getLogin);

router.post('/login',
    authGuard.notAuth,
    bodyParser.urlencoded({extended: true}),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    authController.postLogin
);

router.all('/logout', authGuard.isAuth, authController.logout);

module.exports = router;