const users = require("../Models/userModel");
const jwt = require('jsonwebtoken')

//register
exports.register = async (req,res)=>{
    console.log("inside register request");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{ 
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Alredy Exists!!!")
        }
        else{
            const newUser = new users({
                username,email,password,address:"",Phone:"",profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }   
}

//login
exports.login = async (req,res) =>{
    console.log("inside login");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({
                existingUser,
                token
            })
        }
        else{
            res.status(404).json("Incorrect email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.editUser = async (req,res) =>{
    console.log("inside edituser");
    const userId = req.payload 
    const {username,email,password,address,Phone,profileImage} = req.body
    const profile = req.file?req.file.filename:profileImage
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,address,Phone,profile
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.userInfo=async (req,res)=>{
    console.log("inside user info");
    const {uid} = req.params
    console.log(uid);
    try{
        const user = await users.findById({_id:uid})
        const details = {name:user.username,address:user.address,phone:user.Phone}
        res.status(200).json(details)
    }
    catch(err){
        res.status(401).json(err)
    } 
}