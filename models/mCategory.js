const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category:{type:String},
    bookQty: {type:Number,default:0},
    categoryType:{type:String}
})

categorySchema.set('timestamps',true)

module.exports = mongoose.model('category',categorySchema,'category');