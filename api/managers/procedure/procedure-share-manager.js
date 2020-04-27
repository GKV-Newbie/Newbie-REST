const Procedure = require('../../models/procedure')
const UserReadManager = require('../user/user-read-manager')

async function giveAccess(id,email){
    console.log('procedure-share-manager has recieved a request to create a procedure share')
    
    console.log('attempting Procedure Share create to Mongo')
    try {
        const user = await UserReadManager.getUserByEmail(email);
        if(user._id){
            procedure = await Procedure.findByIdAndUpdate(id,{ $push : { sharedAccess : user._id } },{new:true})
            console.log('procedure=')
            console.log(procedure)
            return {success:'Ok'}
        }
        return {error:'Unknown'}
    } catch (error) {
        console.log(error)
        return {error}
    }
}

async function revokeAccess(id,email){
    console.log('procedure-share-manager has recieved a request to revoke a procedure share')
    
    console.log('attempting Procedure Share revoke to Mongo')
    try {
        const user = await UserReadManager.getUserByEmail(email);
        if(user._id){
            procedure = await Procedure.findByIdAndUpdate(id,{ $pullAll: { sharedAccess: [ user._id ] } },{new:true})
            console.log('procedure=')
            console.log(procedure)
            return {success:'Ok'}
        }
        return {error:'Unknown'}
    } catch (error) {
        console.log(error)
        return {error}
    }
}

module.exports = {giveAccess,revokeAccess}