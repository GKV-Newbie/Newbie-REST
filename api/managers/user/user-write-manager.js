const User = require('../../models/user')
const JWT = require('../../utils/jwt')
const UserReadManager = require('./user-read-manager')

async function registerUser(email,password,registrationType,name,displayPicture){
    let user = {email,password,registrationType,name,displayPicture}
    
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
        return await UserReadManager.loginUser(email,password)
    }
    
}

async function updateUser(id,password,name,displayPicture){
    let user = {password,name,displayPicture}
    for(let prop in user) if(!user[prop]) delete user[prop];
    console.log('user-write-manager has recieved a request to update a user ')
    console.log(user)

    console.log('attempting User update to Mongo')
    try {
        user = await User.findByIdAndUpdate(id,user,{new:true})
        console.log('user=')
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
        return {error}
    }
    
}

module.exports = {registerUser,updateUser}