const { rejects } = require('assert');
const mongoose = require('mongoose');
const { resolve } = require('path');

const DB_URL = 'mongodb://localhost:27017/Online-Shop';

const Schema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    status: String,
    address: String,
    timestamp: Number
})

const CartItem = mongoose.model('cart', Schema)

exports.addNewItem = data => {
    return new Promise((resolve, reject)=> {

        mongoose.connect(DB_URL)
        .then(async ()=> {
            const product = await CartItem.findOne({productId: data.productId});
            if(product) {
                return CartItem.updateOne({productId: data.productId}, {amount: +data.amount + product.amount})
            }
            else {
                let item = new CartItem(data);
                return item.save();
            }
        })
        .then((item) => {
            mongoose.disconnect();
            resolve()
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err)
        });

    });
};

exports.getItemByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(()=> {
            return CartItem.find({userId: userId}, {}, {sort: {timestamp: 1}})
        })
        .then(items => {
            mongoose.disconnect();
            resolve(items);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return CartItem.updateOne({_id: id}, newData)
        })
        .then(item => {
            mongoose.disconnect();
            resolve(item);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return CartItem.deleteOne({_id: id})
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
};

exports.deleteAllItem = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return CartItem.deleteMany({})
        })
        .then( ()=> {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    });
};