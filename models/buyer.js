

const mongoose=require('mongoose');


const shortUrlSchema=new mongoose.Schema({

    views:{
        type:String,
        required:true,
    },
    watchtime:{
        type:String,
        required:true,
    },
    subscribes:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model('buyer',shortUrlSchema);