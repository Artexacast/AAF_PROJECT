const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        //one email per user
        unique: true,
        type: String
    },
    password: String
})

const user = mongoose.model('User', userSchema);

module.exports = user;