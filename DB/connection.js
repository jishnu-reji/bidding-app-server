const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING).then(
    result=>{
        console.log("Mongo db atlas connected with bidserver");
    }
).catch(err=>{
    console.log("Connection Failed!!!");
    console.log(err);
})