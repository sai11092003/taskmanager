const mongoose=require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const note_Schema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true,
},note_Schema.plugin(AutoIncrement, { inc_field: 'ticket',id:'ticketNums',  start_seq:500 ,
incrementBy: 1, })
)

module.exports=mongoose.model('Note',note_Schema);
