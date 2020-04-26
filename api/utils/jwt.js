const JWT = require('jsonwebtoken')

function packJwt(id){
    let accessToken = JWT.sign({id},process.env.ACCESS_TOKEN_SECRET)
    return {accessToken}
}

function unpackJwt(token,successHandler,failureHandler){
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, val) => {
        console.log(err)
        console.log(val)
        if(err){
            failureHandler(err)
            return
        }
        if(val){
            successHandler(val.id)
            return
        }
    })
}

module.exports = {packJwt,unpackJwt}