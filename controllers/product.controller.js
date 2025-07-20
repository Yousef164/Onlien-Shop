const productsModel = require('../models/products.model');

exports.getProduct = (req, res, next)=> {

    let id = req.params.id;
    productsModel.productDetils(id).then((product) => {
        res.render('../views/product.page.ejs', {product: product, title: 'product page'});
    });
}

exports.redirectToHomePage = (req, res, next) => {
    res.redirect('/');
}