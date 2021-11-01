const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@ictakfiles.uq40y.mongodb.net/DIWALI?retryWrites=true&w=majority');

const Schema = mongoose.Schema

const wishSchema = new Schema({

    uname:String,
    rname:String,
    email:String,

});

var wishdata = mongoose.model('wishdata',wishSchema);

module.exports =wishdata;