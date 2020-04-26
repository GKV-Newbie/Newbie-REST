let router = require('express').Router();
const AuthToken = require('../../utils/auth-token');

const UserManager = require('../../managers/user')

router.post('/register', async(req,res)=>{
    let {email,password,registrationType,name} = req.body
    const jwt = await UserManager.registerUser(email,password,registrationType,name)
    res.send(jwt)
})

router.post('/login', async(req,res)=>{
    let {email,password} = req.body
    const jwt = await UserManager.loginUser(email,password)
    res.send(jwt)
})

router.get('/my-account', AuthToken.authenticateToken ,async(req,res)=>{
    const user = await UserManager.getUser(req.userId)
    res.send(user)
})

module.exports = router