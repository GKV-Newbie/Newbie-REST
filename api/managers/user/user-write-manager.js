const User = require('../../models/user')
const JWT = require('../../utils/jwt')

async function registerUser(email,password,registrationType,name){
    let user = {email,password,registrationType,name}
    
    console.log('user-write-manager has recieved a request to register a user ')
    console.log(user)

    console.log('attempting User create to Mongo')
    try {
        user = await User.create(user)
        console.log('user=')
        console.log(user)
        const jwt = JWT.packJwt(user._id)
        return jwt
    } catch (error) {
        console.log(error)
        return {error}
    }
    
}

module.exports = {registerUser}