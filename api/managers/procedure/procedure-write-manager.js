const Procedure = require('../../models/procedure')
const ProcedureReadManager = require('./procedure-read-manager')

async function createProcedure(name,parent,owner,shareType,procedureType,process){
    let procedure = {name,parent,owner,shareType,procedureType,process}

    console.log('procedure-write-manager has recieved a request to create a procedure')
    console.log(procedure)

    console.log('attempting Procedure create to Mongo')
    try {
        if(await ProcedureReadManager.checkProcedureOwner(parent,owner) === false){
            return {error:'Parent not owned by you'}
        }
        procedure = await Procedure.create(procedure)
        console.log('procedure=')
        console.log(procedure)
        return procedure
    } catch (error) {
        console.log(error)
        return {error}
    }
}

async function updateProcedure(id,name,shareType,procedureType,process){
    let procedure = {name,shareType,procedureType,process}

    for(let prop in procedure) if(!procedure[prop]) delete procedure[prop];

    console.log('procedure-write-manager has recieved a request to update a procedure')
    console.log(procedure)

    console.log('attempting Procedure create to Mongo')
    try {
        procedure = await Procedure.findByIdAndUpdate(id,procedure,{new:true})
        console.log('procedure=')
        console.log(procedure)
        return procedure
    } catch (error) {
        console.log(error)
        return {error}
    }
}

module.exports = {createProcedure,updateProcedure}