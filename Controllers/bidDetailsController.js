const biddetails = require("../Models/bidDetailsModel");
const products = require('../Models/productModel')

exports.addbid = async (req,res)=>{
    console.log("inside addbid request");
    const {pdName,pdImage,productId,bidPrice} = req.body
    const bidderId = req.payload
    console.log(pdName,pdImage,bidderId,productId,bidPrice);
    try{ 
        const existingBid = await biddetails.findOne({bidderId,productId})
        const product = await products.findById({_id:productId})
        if(existingBid){
            try{
                existingBid.bidPrice=bidPrice
                await existingBid.save()
                await biddetails.updateMany({productId},{$set:{highBid:bidPrice}})
                product.highBid=bidPrice
                await product.save()
                res.status(201).json(existingBid)
            }
            catch(err){
                res.status(401).json(err)
            }
        }
        else{
            try{
                const newBid = new biddetails({
                pdName,pdImage,bidderId,productId,bidPrice,highBid:bidPrice
                })
                await newBid.save()
                await biddetails.updateMany({productId},{$set:{highBid:bidPrice}})
                product.highBid=bidPrice
                await product.save()
                res.status(200).json(newBid)
            }
            catch(err){
                res.status(401).json(err)
            }
        }
    }catch(err){
        res.status(401).json(err)
    }   
}

exports.userBids = async(req,res)=>{
    const userId = req.payload
    try{
        const result = await biddetails.find({bidderId:userId})
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}