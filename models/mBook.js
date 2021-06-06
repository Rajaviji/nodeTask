const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {type:String},
    categoryType:{type:String},
    status:{type:String,default:"For Sale"}
})

bookSchema.set('timestamps',true);

module.exports = mongoose.model('book',bookSchema,'book');

