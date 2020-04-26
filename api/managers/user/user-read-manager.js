const User = require('../../models/user')

async function loginUser(email,password){
    let user = {email,password}
    
    console.log('user-read-manager has recieved a request to login a user ')
    console.log(user)

    console.log('attempting User fetch from Mongo')

    user = await User.findOne(user).lean()

    console.log('user=')
    console.log(user)

    if(user&&user._id){
        console.log('returning user')

        return user
    }

    console.log('returning null')
    
    return null
}

module.exports = {loginUser}