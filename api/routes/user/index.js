let router = require('express').Router();
const jwt = require('jsonwebtoken');

const UserManager = require('../../managers/user/user-manager')

router.post('/register', async(req,res)=>{
    let {email,password,registrationType,name} = req.body
    const user = await UserManager.registerUser(email,password,registrationType,name)
    return user
})

router.post('/login', async(req,res)=>{
    let {email,password} = req.body
    const user = await UserManager.loginUser(email,password)
    return user
})

module.exports = router