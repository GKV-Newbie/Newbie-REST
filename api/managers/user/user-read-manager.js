const User = require('../../models/user')
const JWT = require('../../utils/jwt')

async function loginUser(email,password){
    let user = {email,password}
    
    console.log('user-read-manager has recieved a request to login a user ')
    console.log(user)

    console.log('attempting User fetch from Mongo')

    try {
        user = await User.findOne(user).lean()
        console.log('user=')
        console.log(user)
        if(user){
            const jwt = JWT.packJwt(user._id)
            return jwt
        }
        return {error:'Unknown'}
    } catch (error) {
        console.log(error)
        return {error}
    }
}

async function getUser(id){
    console.log('user-read-manager has recieved a request to get a user by id '+id)
    try {
        const user = await User.findById(id).lean()
        console.log('user=')
        console.log(user)
        if(user){
            return user
        }
        return {error:'Unknown'}
    } catch (error) {
        console.log(error)
        return {error}
    }
}

async function getUserByEmail(email){
    console.log('user-read-manager has recieved a request to get a user by email '+email)
    try {
        const user = await User.findOne({email}).lean()
        console.log('user=')
        console.log(user)
        if(user){
            return user
        }
        return {error:'Unknown'}
    } catch (error) {
        console.log(error)
        return {error}
    }
}

module.exports = {loginUser,getUser,getUserByEmail}