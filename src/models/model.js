const mongoose= require("mongoose")

const UserSechma= new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        trim:true
    },
    lastname:{
        type:String,
        require:true
    },
    Username:{
        type:String,
        require:true
    },

    userName:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true,
        Unique:true
    },
    email:{
        type:String,
        require:true,
        Unique:true
    },
    passward:{
        type:String,
        require:true
    }

})

const RegisteredUser = new mongoose.model('User',UserSechma)
module.exports=RegisteredUser;