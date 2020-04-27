let router = require('express').Router();
const AuthToken = require('../../utils/auth-token');

const ProcedureManager = require('../../managers/procedure')

router.post('/create', AuthToken.authenticateToken ,async(req,res)=>{
    let {name,parent,owner,shareType,procedureType,process} = req.body
    owner = req.userId
    const procedure = await ProcedureManager.createProcedure(name,parent,owner,shareType,procedureType,process)
    if(procedure.error)
        res.sendStatus(500).send(procedure)
    else    
        res.send(procedure)
})

router.get('/read', AuthToken.optionalAuthenticateToken , ProcedureManager.canRead , async(req,res)=>{
    if(procedure.error)
        res.sendStatus(500).send(procedure)
    else    
        res.send(procedure)
})

router.put('/update', AuthToken.authenticateToken , ProcedureManager.canUpdate ,async(req,res)=>{
    let {id,name,shareType,procedureType,process} = req.body
    const procedure = await ProcedureManager.updateProcedure(id,name,shareType,procedureType,process)
    if(procedure.error)
        res.sendStatus(500).send(procedure)
    else    
        res.send(procedure)
})

router.use('/list',require('./list'))

router.use('/share',require('./share'))

module.exports = router