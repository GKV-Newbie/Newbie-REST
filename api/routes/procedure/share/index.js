let router = require('express').Router();
const AuthToken = require('../../../utils/auth-token');

const ProcedureManager = require('../../../managers/procedure')

router.put('/give', AuthToken.authenticateToken , ProcedureManager.canUpdate ,async(req,res)=>{
    let {id,email} = req.body
    const response = await ProcedureManager.giveAccess(id,email)
    if(response.error)
        res.sendStatus(500).send(response)
    else    
        res.send(response)
})

router.put('/revoke', AuthToken.authenticateToken , ProcedureManager.canUpdate ,async(req,res)=>{
    let {id,email} = req.body
    const response = await ProcedureManager.revokeAccess(id,email)
    if(response.error)
        res.sendStatus(500).send(response)
    else    
        res.send(response)
})

module.exports = router