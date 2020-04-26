const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:'Email is required for user'
    },
    password:{
        type:String,
        required:'Password is required for user'
    },
    registrationType:{
        type: String, 
        enum : ['InApp', 'Google', 'Facebook'], 
        default: 'InApp'
    },
    userType:{
        type: String, 
        enum : ['Admin', 'Member'], 
        default: 'Member'
    },
    name:{
        type: String,
        default: 'N/A'
    }
});

userSchema.index({'email':1},{unique:true})

module.exports = mongoose.model('User',userSchema);