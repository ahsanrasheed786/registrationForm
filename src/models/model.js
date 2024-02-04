const mongoose= require("mongoose")

const UserSechma= new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true,
        trim:true
    },
    Username:{
        type:String,
        require:true,
        trim:true
    },

    userName:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:Number,
        require:true,
        Unique:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        Unique:true,
        trim:true
    },
    passward:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    baseImage:{
        type:String,
        require:true
    }

})

const RegisteredUser = new mongoose.model('User',UserSechma)
module.exports=RegisteredUser;