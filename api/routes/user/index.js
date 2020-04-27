let router = require('express').Router();
const AuthToken = require('../../utils/auth-token');

const UserManager = require('../../managers/user')

router.post('/register', async(req,res)=>{
    console.log(req)
    let {email,password,registrationType,name,displayPicture} = req.body
    const jwt = await UserManager.registerUser(email,password,registrationType,name,displayPicture)
    if(jwt.error)
        res.sendStatus(500).send(jwt)
    else    
        res.send(jwt)
})

router.post('/login', async(req,res)=>{
    let {email,password} = req.body
    const jwt = await UserManager.loginUser(email,password)
    if(jwt.error)
        res.sendStatus(500).send(jwt)
    else    
        res.send(jwt)
})

router.get('/my-account', AuthToken.authenticateToken ,async(req,res)=>{
    const user = await UserManager.getUser(req.userId)
    if(user.error)
        res.sendStatus(500).send(user)
    else    
        res.send(user)
})

router.get('/user-account', async(req,res)=>{
    const user = await UserManager.getUserByEmail(req.query.email)
    if(user.error)
        res.sendStatus(500).send(user)
    else    
        res.send(user)
})

router.put('/update', AuthToken.authenticateToken , async(req,res)=>{
    let {name,password,displayPicture} = req.body
    const user = await UserManager.updateUser(req.userId,password,name,displayPicture)
    if(user.error)
        res.sendStatus(500).send(user)
    else    
        res.send(user)
})

module.exports = router