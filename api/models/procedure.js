const mongoose = require('mongoose');

const procedureSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:'Name is required for procedure'
    },
    process:{
        type:String,
        required:'Process is required for procedure'
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

userSchema.index({'parentGroup':1,'name':1},{unique:true})

module.exports = mongoose.model('Procedure',procedureSchema);