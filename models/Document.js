const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
let currTime = Math.floor(Date.now() / 1000) ;

const docSchema = new Schema({
    date: type : Date, default: currTime,
    author: String,
    checkedout: Number,
    checkedoutby: String,
    doctitle: String,
    code: String
})

const doc = mongoose.model('Document', docSchema);

module.exports = doc;