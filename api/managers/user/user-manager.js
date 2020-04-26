const UserReadManager = require('./user-read-manager')
const UserWriteManager = require('./user-write-manager')

module.exports = {
    registerUser:UserWriteManager.registerUser,
    loginUser:UserReadManager.loginUser
}
