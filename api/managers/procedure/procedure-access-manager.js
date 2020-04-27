const ObjectId = require('mongodb').ObjectID;
const ProcedureReadManager = require('./procedure-read-manager')

async function canRead(req,res,next){
    console.log('checking if request has a procedure id >'+req.body.id)
    const procedureId = req.query.id
    if(!procedureId){
        return res.sendStatus(404)
    }
    
    console.log('checking if the requested procedure id exists')
    const procedure = await ProcedureReadManager.getProcedure(procedureId)
    req.procedure = procedure
    if(!procedure._id){
        return res.sendStatus(404)
    }
    
    console.log('checking if the procedure is public >'+procedure.shareType)
    if(procedure.shareType==='public'){
        next()
        return
    }

    console.log('checking if request has a user id >'+req.userId)
    const userId = req.userId
    if(!userId){
        return res.sendStatus(403)
    }

    console.log('checking if the procedure is owned by the user >'+procedure.owner)
    if(procedure.owner.equals(userId)){
        next()
        return
    }

    console.log('checking if the procedure is shared to the user >'+procedure.sharedAccess)
    for(let i in procedure.sharedAccess){
        console.log(i)
        if(procedure.sharedAccess[i].equals(userId)){
            next()
        
            return
        }
    }


    return res.sendStatus(403)

}

async function canUpdate(req,res,next){

    console.log('checking if request has a procedure id')
    const procedureId = req.body.id
    if(!procedureId){
        return res.sendStatus(404)
    }
    
    console.log('checking if the requested procedure id exists')
    const procedure = await ProcedureReadManager.getProcedure(procedureId)
    req.procedure = procedure
    if(!procedure._id){
        return res.sendStatus(404)
    }

    console.log('checking if request has a user id')
    const userId = req.userId
    if(!userId){
        return res.sendStatus(403)
    }

    console.log('checking if the procedure is owned by the user >'+procedure.owner+' >'+userId)
    if(procedure.owner.equals(userId)){
        next()
        return
    }

    return res.sendStatus(403)

}

module.exports = {canRead,canUpdate}