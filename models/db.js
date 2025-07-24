const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/Online-Shop';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;