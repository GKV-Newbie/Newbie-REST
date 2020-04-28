const mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');

const procedureSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:'Name is required for procedure'
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Procedure',
        default:null
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    shareType:{
        type: String, 
        enum : ['public', 'private'], 
        default: 'public'
    },
    sharedAccess:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    procedureType:{
        type:String,
        enum : ['group', 'process'], 
        default: 'group'
    },
    process:{
        type:String
    }
});

procedureSchema.plugin(idvalidator)

procedureSchema.index({'parent':1,'name':1},{unique:true})

var autoPopulate = function(next) {
    console.log('populating')
    //this.populate('stats');
    this.populate('owner','name email');
    this.populate('sharedAccess','name email');
    next();
};
  
procedureSchema.
    pre('findById', autoPopulate).
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);

module.exports = mongoose.model('Procedure',procedureSchema);