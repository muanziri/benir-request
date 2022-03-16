

const mongoose=require('mongoose');


const shortUrlSchema=new mongoose.Schema({

    videoId:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        required:true,
        default:0
    }
});

module.exports=mongoose.model('watchtime',shortUrlSchema);