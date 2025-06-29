const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'./public/images/products')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")
    }
})

const upload = multer({
    storage:storage
})

router.get('/',(req,res)=>{
    const product =[{name:"apple",price:100,image:"images/products/product1.png"}
        ,{name:"banana",price:50,image:"images/products/product2.png"},
        {name:"orange",price:80,image:"images/products/product3.png"}]
    const address = "<h1>helloWorld</h1>"
    res.render('index.ejs',{address:address,product:product})
})

router.get('/addForm',(req,res)=>{
    res.render('form.ejs')
})
router.get('/manage',(req,res)=>{
    res.render('manage.ejs')
})
router.post('/insert', upload.single('image'), (req, res) => {
    console.log(req.file)
    // let data = new Product({
    //     name:req.body.name,
    //     price:req.body.price,
    //     image:req.body.image,
    //     description:req.body.description
    // })
    // Product.saveProduct(data,(err)=>{
    //     if (err) console.log(err)
    // })
    // res.redirect('/')
})



module.exports = router