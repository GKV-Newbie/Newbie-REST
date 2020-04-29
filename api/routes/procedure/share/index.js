let router = require('express').Router();
const AuthToken = require('../../../utils/auth-token');
const Crypto = require('../../../utils/encryption')

const ProcedureManager = require('../../../managers/procedure')

router.put('/give', AuthToken.authenticateToken , ProcedureManager.canUpdate ,async(req,res)=>{
    let {id,email} = req.body
    const response = await ProcedureManager.giveAccess(id,email)
    if(response.error)
        res.sendStatus(500).send(response)
    else    
        res.send(response)
})

router.get('/fgive' ,async(req,res)=>{
    try {
        let {data} = req.query
        let pt = Crypto.decrypt(data)
        const val = JSON.parse(pt)
        const response = await ProcedureManager.giveAccess(val.id,val.email)
        if(response.error)
            res.sendStatus(500).send(response)
        else    
            {
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.send("<h1>Thanks for sharing access</h1>")
            }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.put('/revoke', AuthToken.authenticateToken , ProcedureManager.canUpdate ,async(req,res)=>{
    let {id,email} = req.body
    const response = await ProcedureManager.revokeAccess(id,email)
    if(response.error)
        res.sendStatus(500).send(response)
    else    
        res.send(response)
})

router.put('/request', AuthToken.authenticateToken , async(req,res)=>{
    let {id,email} = req.body
    const response = await ProcedureManager.requestAccess(id,email)
    if(response.error)
        res.sendStatus(500).send(response)
    else    
        res.send(response)
})

module.exports = router