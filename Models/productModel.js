const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    stPrice:{
        type:Number,
        required:true
    },
    highBid:{
        type:Number,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const products = mongoose.model("products",productSchema)
module.exports = products