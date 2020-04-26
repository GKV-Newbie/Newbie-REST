const Procedure = require('../../models/procedure')

async function listProcedures(query){
    console.log('attempting Procedure fetch from Mongo')
    try {
        const procedure = await Procedure.find(query,{"process":0}).lean()
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
            return procedure
        }
        return {error:'Unknown'}
    } catch (error) {
        console.log(error)
        return {error}
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

async function listOwnedProcedures(owner,parent=null){
    let procedure = {owner,parent}

    console.log('procedure-read-manager has recieved a request to read a procedure')
    console.log(procedure)

    console.log('attempting Procedure fetch from Mongo')

    return await listProcedures(procedure)
}

async function listSharedAccessProcedures(sharedAccess,parent=null){
    let procedure = {sharedAccess,parent}

    console.log('procedure-read-manager has recieved a request to read a procedure')
    console.log(procedure)

    console.log('attempting Procedure fetch from Mongo')
    
    return await listProcedures(procedure)
}

module.exports = {getProcedure,listAllProcedures,listOwnedProcedures,listSharedAccessProcedures}