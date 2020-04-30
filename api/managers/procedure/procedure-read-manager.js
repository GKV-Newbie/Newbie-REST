const Procedure = require('../../models/procedure')
const UserReadManager = require('../user/user-read-manager')

async function listProcedures(query){
    console.log('attempting Procedure fetch from Mongo')
    try {
        const procedure = await Procedure.find(query,{"process":0,"sharedAccess":0}).lean()
        console.log('procedure=')
        console.log(procedure)
        return procedure
    } catch (error) {
        console.log(error)
        return {error}
    }
}

async function getProcedure(id){
    console.log('procedure-read-manager has recieved a request to get a procedure by id '+id)
    try {
        const procedure = await Procedure.findById(id).lean()
        console.log('procedure=')
        console.log(procedure)
        if(procedure){
            //delete procedure.sharedAccess;
            return procedure
        }
        return {error:'Unknown'}
    } catch (error) {
        console.log(error)
        return {error}
    }
}


async function checkProcedureOwner(id,owner){
    if(!id || id==null){
        return true
    }
    console.log('procedure-read-manager has recieved a request to get a procedure by id '+id)
    try {
        const procedure = await Procedure.findById(id).lean()
        console.log('procedure=')
        console.log(procedure)
        if(procedure){
            return procedure.owner._id.equals(owner)
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

async function listAllProcedures(user){
    let procedure = {
        $or:[
            {
                owner:user
            },
            {
                sharedAccess:user
            }
        ]
    }

    console.log('procedure-read-manager has recieved a request to read a procedure')
    console.log(procedure)

    console.log('attempting Procedure fetch from Mongo')

    return await listProcedures(procedure)
}

async function listOwnedProcedures(owner){
    let procedure = {owner}

    console.log('procedure-read-manager has recieved a request to read a procedure')
    console.log(procedure)

    console.log('attempting Procedure fetch from Mongo')

    return await listProcedures(procedure)
}

async function listOwnedProceduresByEmail(email){
    const user = await UserReadManager.getUserByEmail(email)
    if(!user)
        return {error:'Unknown'}
    return await listOwnedProcedures(user._id)
}

async function listSharedAccessProcedures(sharedAccess){
    let procedure = {sharedAccess}
    
    console.log('procedure-read-manager has recieved a request to read a procedure')
    console.log(procedure)

    console.log('attempting Procedure fetch from Mongo')
    
    procedures = await listProcedures(procedure)

    //return procedures

    children = []

    for(let i=0; i<procedures.length ; i++){
        const proc = procedures[i];
        children = children.concat(await listChildProcedures(proc._id))
    }

    return procedures.concat(children)
}

async function listChildProcedures(id){
    let procedures = await listProcedures({parent:id})
    for (let i = 0; i < procedures.length; i++) {
        const procedure = procedures[i];
        if(procedure.procedureType==='group'){
            let temp = await listChildProcedures(procedure._id);
            for (let j = 0; j < temp.length; j++) {
                procedures.push(temp[j])
            }
        }
    }
    return procedures
}

module.exports = {getProcedure,listAllProcedures,listOwnedProcedures,listOwnedProceduresByEmail,listSharedAccessProcedures,checkProcedureOwner,listChildProcedures}