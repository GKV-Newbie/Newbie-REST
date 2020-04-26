const User = require('../../models/user')

async function registerUser(email,password,registrationType,name){
    let user = {email,password,registrationType,name}
    
    console.log('user-write-manager has recieved a request to register a user ')
    console.log(user)

    console.log('attempting User create to Mongo')

    user = await User.create(user).lean()

    console.log('user=')
    console.log(user)

    if(user&&user._id){
        console.log('returning user')

        return user
    }

    console.log('returning null')

    return null
}

module.exports = {registerUser}