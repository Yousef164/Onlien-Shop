const mongoose = require('mongoose');

const URL_DB = 'mongodb://localhost:27017/Online-Shop';

const Schema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
})

const CartItem = mongoose.model('cart', Schema)

exports.addNewItem = data => {
    return new Promise((resolve, reject)=> {

        mongoose.connect(URL_DB)
        .then(()=> {
            let item = new CartItem;
            return item.save();
        })
        .them(()=> {
            mongoose.disconnect();
            resolve()
        })
        .catch(err => {
            mongoose.disconnect();
            reject()
        });

    });
};