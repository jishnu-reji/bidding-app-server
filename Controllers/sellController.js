const soldproducts = require('../Models/soldProductModel')
const boughtProducts = require('../Models/boughtProductModel')
const biddetails = require("../Models/bidDetailsModel");
const products = require('../Models/productModel')


exports.addToSold = async (req,res) =>{
    console.log("Inside add to sold request");
    console.log(req.payload);
    console.log(req.body);
    const {pdName,price,pid} = req.body
    const sellerId = req.payload
    const bidsonProduct= await biddetails.findOne({productId:pid,bidPrice:price})
    console.log(bidsonProduct.bidderId);
    const bidderId = bidsonProduct.bidderId

    try{
        const soldProduct = new soldproducts({
            pdName,bidderId,sellerId,price
        })
        await soldProduct.save()
        const boughtProduct = new boughtProducts({
            pdName,bidderId,sellerId,price
        })
        await boughtProduct.save()
        await products.findByIdAndDelete({_id:pid})
        await biddetails.deleteMany({productId:pid})
        res.status(200).json(soldProduct)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getUserSoldProducts =async(req,res)=>{
    const sellerId = req.payload
    try{
        const userSoldProducts = await soldproducts.find({sellerId})
        res.status(200).json(userSoldProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getUserBoughtProducts =async(req,res)=>{
    const bidderId = req.payload
    try{
        const userBoughtProducts = await boughtProducts.find({bidderId})
        console.log("inside bought");
        res.status(200).json(userBoughtProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.removeSoldProducts = async(req,res)=>{
    console.log("inside delete sold");
    const {sid} = req.params
    try{
        const soldDetails = await soldproducts.findByIdAndDelete({_id:sid})
        res.status(200).json(soldDetails)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.removeBoughtProducts = async(req,res)=>{
    console.log("inside delete bought");
    const {boughtid} = req.params
    try{
        const boughtDetails = await boughtProducts.findByIdAndDelete({_id:boughtid})
        res.status(200).json(boughtDetails)
    }
    catch(err){
        res.status(401).json(err)
    }
}

