const mongoose=require('mongoose');
const schema=mongoose.Schema

const UserSchema=new schema({
    userName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
    },
    googleid:{
        type:String,
    },
    Profilephoto:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        default:0
    },
    views:{
        type:Number,
        required:true,
        default:0
    },
    subcribes:{
        type:Number,
        required:true,
        default:0
    },
    watchtime:{
        type:Number,
        required:true,
        default:0
    },date:{
        type:Date,
        default:Date.now
    }
})


module.exports=mongoose.model('buyerClient',UserSchema);