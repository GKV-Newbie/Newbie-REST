const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
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

module.exports = mongoose.model('User',userSchema);