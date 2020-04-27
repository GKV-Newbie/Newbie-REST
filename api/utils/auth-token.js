const jwt = require('./jwt');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    jwt.unpackJwt(token,function(id){
        req.userId = id
        next()
    },function(err){
        console.log(authHeader)
        res.sendStatus(403)
    });
}

function optionalAuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    jwt.unpackJwt(token,function(id){
        req.userId = id
        next()
    },function(err){
        next()
    });
}

module.exports={authenticateToken,optionalAuthenticateToken}