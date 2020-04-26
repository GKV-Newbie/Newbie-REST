const mongoose = require('mongoose');

const procedureGroupSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:'Name is required for procedure group'
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProcedureGroup'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    shareType:{
        type: String, 
        enum : ['public', 'private', 'unlisted'], 
        default: 'public'
    },
    sharedAccess:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
});

userSchema.index({'parent':1,'name':1},{unique:true})

module.exports = mongoose.model('ProcedureGroup',procedureGroupSchema);