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
    }
    ,
    facebookid:{
        type:String,
    }
    ,
    twitterid:{
        type:String,
    }
    ,
    Profilephoto:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        required:true,
        default:0
    },
    MEGApoints:{
        type:Number,
        required:true,
        default:0
    },
    MIDpoints:{
        type:Number,
        required:true,
        default:0
    },

    phoneNumber:{
        type:Number,
        required:true,
        default:0
    },
    moneytobePaid:{
        type:Number,
        required:true,
        default:0
    },date:{
        type:Date,
        default:Date.now
    }
})


module.exports=mongoose.model('usersClients',UserSchema);