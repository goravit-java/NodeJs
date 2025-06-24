const express = require('express')
const path = require('path')
const router = require('./router/myRouter')
const app = express()


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

app.listen(3000,()=>{
    console.log("strat program")
})