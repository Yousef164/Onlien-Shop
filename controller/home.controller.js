const productsModel = require('../models/products.model');

exports.getHome = (req, res) =>{
    //get products
    // render index.ejs

    productsModel.getAllProducts().then(products =>{
        res.render('index', {title: 'Home Page', products: products});
    })
}