const mongoose=require('mongoose');
const user_Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:[{
        type:String,
        default:'Employee'
    }],
    active:{
        type:Boolean,
        default:true
    }

})

module.exports=mongoose.model('User',user_Schema);
