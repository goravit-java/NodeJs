const express = require('express')
const router = express.Router()

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


module.exports = router