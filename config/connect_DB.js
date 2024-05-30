const mongoose = require('mongoose');
require('dotenv').config()
const Connect=async()=>{
   
    try{
await  mongoose.connect(process.env.DATABASE_URI,)

   }catch(e){
    console.log(e)
   }
}
module.exports=Connect;
