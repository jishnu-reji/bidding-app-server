require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const router = require('./Routes/router')
require('./DB/connection')

const bidServer = express();
const server = http.createServer(bidServer);
const io = socketIo(server);

bidServer.use(cors());
bidServer.use(express.json());
bidServer.use(router)
bidServer.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT

bidServer.listen(PORT,()=>{
    console.log(`BidHub Server started at PORT : ${PORT}`);
})

bidServer.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:red">BidHub server started and waiting for client request!!!</h1>`)
})

