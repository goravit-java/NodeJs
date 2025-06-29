//ใช้งาน mondgoose
const mondgoose = require('mongoose')
//เชื่อมไปยัง mongoDB
const dbUrl = 'mongodb://localhost:27017/productDB'
mondgoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

//ออกแบบ schema
let productSchema = mondgoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})
//สร้างโมเดล
let Product = mondgoose.model("products",productSchema)
///ส่งออกโมเดล
module.exports = Product

//ออกแบบฟังก์ชั่นสำหรับบันทึกข้อมูล
module.exports.saveProduct = async function saveProduct(data) {
  const product = new Product(data);   // ❗️ ต้องสร้าง instance ก่อน
  return await product.save();         // ❗️ ใช้ await (ไม่มี callback)
}