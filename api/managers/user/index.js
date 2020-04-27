const UserReadManager = require('./user-read-manager')
const UserWriteManager = require('./user-write-manager')

module.exports = {
    registerUser:UserWriteManager.registerUser,
    updateUser:UserWriteManager.updateUser,
    loginUser:UserReadManager.loginUser,
    getUser:UserReadManager.getUser,
    getUserByEmail:UserReadManager.getUserByEmail
}
