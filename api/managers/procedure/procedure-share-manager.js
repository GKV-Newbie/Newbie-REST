const Procedure = require('../../models/procedure')
const UserReadManager = require('../user/user-read-manager')
const Mailer = require('../../utils/mail-manager')
const Crypto = require('../../utils/encryption')

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

async function requestAccess(id,email){
    console.log('procedure-share-manager has recieved a request to request a procedure share')
    try {
        const user = await UserReadManager.getUserByEmail(email);
        if(user._id){
            const procedure = await Procedure.findById(id).lean()
            const data = {
                email,
                id
            }

            const dataEnc = Crypto.encrypt(JSON.stringify(data))

            await Mailer.sendMail(
                procedure.owner.email,
                "Newbie: "+user.name+" needs a favour",
                "Hi "+procedure.owner.name+","+
                "\n\nI'm "+user.name+" Can I please get access to "+procedure.name+"."+
                "<a href='https://newbie-rest.herokuapp.com/procedure/share/fgive?data="+dataEnc+"'>Click here to give me access</a>"
            )
            return {'success':'OK'}
        }
        
    } catch (error) {
        console.log(error)
        return {error}
    }
}

module.exports = {giveAccess,revokeAccess,requestAccess}