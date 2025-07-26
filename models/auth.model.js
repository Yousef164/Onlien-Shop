const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const DB_URI = 'mongodb://localhost:27017/Online-Shop';

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default:false
    }
});

const User = mongoose.model('User', userSchema);

exports.createNewUser = (username, email, password) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI)
        .then(()=> {
            return User.findOne({ email: email });
        })
        .then(user => {
            if(user) {
                mongoose.disconnect();
                reject(('User already exists'));
            }
            else {
                return bcrypt.hash(password, 10);
            }
        })
        .then(hashedPassword => {
            let newUser = new User({
                username: username, 
                email: email,
                password: hashedPassword
            });
            return newUser.save();
        })
        .then(()=> {
            mongoose.disconnect();
            resolve('User created successfully');
         })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};


exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI).then(() => {
            return User.findOne({email: email});        
        })
        .then(user => {
            if(!user) {
                mongoose.disconnect();
                reject('User not found');
            }
            else {
                bcrypt.compare(password, user.password)
                .then(same => {
                    if(!same)
                    {
                        mongoose.disconnect();
                        reject('Incorrect password');
                    }
                    else{
                        mongoose.disconnect();
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        });
                    }
                })
            }
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    });
};