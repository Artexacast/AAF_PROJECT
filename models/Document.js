const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
    id: Number,
    version: Number,
    date:  Number, 
    author: String,
    checkedout: String,
    checkedoutby: String,
    doctitle: String,
    creator: String,
    optional: String
})

const doc = mongoose.model('Document', docSchema);

module.exports = doc;