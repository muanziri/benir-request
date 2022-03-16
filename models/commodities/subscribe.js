

const mongoose=require('mongoose');


const shortUrlSchema=new mongoose.Schema({

    ChannelUrl:{
        type:String,
        required:true,
    },
    ChannelName:{
        type:String,
        required:true,
    },
    Discription:{
      type:String,
      required:true  
    }, 
    clicks:{
        type:Number,
        required:true,
        default:0
    }
});

module.exports=mongoose.model('subscribe',shortUrlSchema);