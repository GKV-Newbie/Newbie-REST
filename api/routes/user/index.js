let router = require('express').Router();
const AuthToken = require('../../utils/auth-token');

const UserManager = require('../../managers/user')

router.post('/register', async(req,res)=>{
    let {email,password,registrationType,name,displayPicture} = req.body
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

router.get('/user-account', async(req,res)=>{
    const user = await UserManager.getUserByEmail(req.query.email)
    res.send(user)
})

router.put('/update', AuthToken.authenticateToken , async(req,res)=>{
    let {name,password,displayPicture} = req.body
    const user = await UserManager.updateUser(req.userId,password,name,displayPicture)
    res.send(user)
})

module.exports = router