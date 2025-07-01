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

router.get('/',async (req,res)=>{
    try {
        const doc = await Product.find();
        res.render('index', { product: doc });
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }   
})

router.get('/addForm',(req,res)=>{
    res.render('form.ejs')
})
router.get('/manage',async(req,res)=>{
    try {
        const doc = await Product.find();
        res.render('manage.ejs',{ product: doc })
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }  
    
})
router.post('/insert', upload.single('image'),(req, res) => {
    
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    Product.saveProduct(data,(err)=>{
        if (err) console.log(err)
    })
    res.redirect('/')
})



module.exports = router