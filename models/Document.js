const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
    date:  Number, 
    author: String,
    checkedout: Number,
    checkedoutby: String,
    doctitle: String,
    creator: String,
    optional: String
})

const doc = mongoose.model('Document', docSchema);

module.exports = doc;