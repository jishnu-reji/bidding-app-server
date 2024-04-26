const mongoose = require('mongoose')

const boughtProductsSchema = new mongoose.Schema({
    pdName:{
        type:String,
    },
    bidderId:{
        type:String,
    },
    sellerId:{
        type:String,
    },
    price:{
        type:Number,
    }
})

const boughtproducts = mongoose.model("boughtproducts",boughtProductsSchema)
module.exports = boughtproducts