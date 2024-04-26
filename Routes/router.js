const express = require('express')
const userController = require('../Controllers/userController')
const productController = require('../Controllers/productController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const bidDetailsController = require('../Controllers/bidDetailsController')
const sellController = require('../Controllers/sellController')


const router = new express.Router()

router.post('/register',userController.register)

router.post('/login',userController.login)

router.post('/addproduct',jwtMiddleware,multerConfig.single('productImage'),productController.addProduct)

router.get('/allproducts',jwtMiddleware,productController.getAllProducts)

router.get('/userproducts',jwtMiddleware,productController.getUserProducts)

router.get('/homeproducts',productController.getHomeProducts)

router.post('/addbid',jwtMiddleware,bidDetailsController.addbid)

router.get('/userbids',jwtMiddleware,bidDetailsController.userBids)

router.post('/addtosold',jwtMiddleware,sellController.addToSold)

router.get('/usersoldproducts',jwtMiddleware,sellController.getUserSoldProducts)

router.get('/userboughtproducts',jwtMiddleware,sellController.getUserBoughtProducts)

router.delete('/removesold/:sid',jwtMiddleware,sellController.removeSoldProducts)

router.delete('/removebought/:boughtid',jwtMiddleware,sellController.removeBoughtProducts)

router.put('/edituser',jwtMiddleware,multerConfig.single('profileImage'),userController.editUser)

router.get('/userdetails/:uid',jwtMiddleware,userController.userInfo)




module.exports = router