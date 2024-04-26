const products = require('../Models/productModel')

exports.addProduct = async (req,res) =>{
    console.log("Inside add product request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const {productName,mrp,stPrice,endDate} = req.body
    const userId = req.payload
    const productImage = req.file.filename
    try{
        const newProduct = new products({
            productName,mrp,stPrice,highBid:stPrice,endDate,productImage,userId
        })
        await newProduct.save()
        res.status(200).json(newProduct)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getAllProducts = async (req,res) =>{

    const userId = req.payload
    const searchKey = req.query.search
    const query = {
        $and:[
        {productName : {$regex:searchKey,$options:'i'}},
        { userId: { $ne: userId } }
        ]
    }
    try{
        const allProducts = await products.find(query)
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getUserProducts = async (req,res) =>{

    const userId = req.payload
    try{
        const allProducts = await products.find({userId})
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getHomeProducts = async (req,res) =>{
    try{
        const allProducts = await products.find().limit(4)
        res.status(200).json(allProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

