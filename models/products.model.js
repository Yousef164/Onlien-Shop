const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/Online-Shop";

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String
})

const Product = mongoose.model('product', productSchema);


exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        })
        .then(products => {
            mongoose.disconnect();
            resolve(products);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.productDetils = (id)=> {

    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(() => {
            return Product.findById(id);
        })
        .then(product => {
            mongoose.disconnect();
            resolve(product);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    })
}
