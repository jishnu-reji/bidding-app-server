const mongoose = require('mongoose')

const bidDetailsSchema = new mongoose.Schema({
    pdName:{
        type:String,
    },
    pdImage:{
        type:String,
    },
    bidderId:{
        type:String,
    },
    productId:{
        type:String,
    },
    bidPrice:{
        type:Number,
    },
    highBid:{
        type:Number,
    }
})

const biddetails = mongoose.model("biddetails",bidDetailsSchema)
module.exports = biddetails