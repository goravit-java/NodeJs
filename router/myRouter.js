const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    const name = "goravit"
    const age = 15
    const address = "<h1>helloWorld</h1>"
    res.render('index.ejs',{data:name,age:age,address:address})
})


module.exports = router