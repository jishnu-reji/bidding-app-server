const mongoose = require('mongoose')

const soldProductSchema = new mongoose.Schema({
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

const soldProducts = mongoose.model("soldproducts",soldProductSchema)
module.exports = soldProducts