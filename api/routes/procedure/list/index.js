let router = require('express').Router();
const AuthToken = require('../../../utils/auth-token');

const ProcedureManager = require('../../../managers/procedure')

router.get('/', AuthToken.authenticateToken , async(req,res)=>{
    const user = req.userId
    const procedures = await ProcedureManager.listAllProcedures(user)
    res.send(procedures)
})

router.get('/my', AuthToken.authenticateToken , async(req,res)=>{
    const user = req.userId
    const procedures = await ProcedureManager.listOwnedProcedures(user)
    res.send(procedures)
})

router.get('/shared', AuthToken.authenticateToken , async(req,res)=>{
    const user = req.userId
    const procedures = await ProcedureManager.listSharedAccessProcedures(user)
    res.send(procedures)
})

router.get('/user' , async(req,res)=>{
    const email = req.query.email
    const procedures = await ProcedureManager.listOwnedProceduresByEmail(email)
    res.send(procedures)
})

router.get('/child' , async(req,res)=>{
    const id = req.query.id
    const procedures = await ProcedureManager.listChildProcedures(id)
    res.send(procedures)
})

module.exports = router