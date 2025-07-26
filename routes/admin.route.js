const router = require('express').Router();
const check = require('express-validator').check;
const multer = require('multer');

const adminController = require('../controllers/admin.controller');
const adminGuard = require('./guards/admin.guard');

router.get('/add', adminGuard, adminController.getAdd);

router.post('/add',
    adminGuard,

    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'images')
            },
            filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
            }
        })
    })
    .single('image'),
    check('name')
    .notEmpty()
    .withMessage('name is required'),
    check('price')
    .isNumeric()
    .withMessage('price should be number'),
    check('description')
    .notEmpty()
    .withMessage('description is required'),
    check('image')
    .custom((value, {req}) => {
        if(req.file) return true;
        else throw 'image is required';
    }),
    adminController.postAdd
);

module.exports = router