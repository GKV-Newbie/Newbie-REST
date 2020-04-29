const crypt = require('simple-encryptor');

//REQUIRES CHANGES
function getKey(val){
    return val + ";[9,Tx.YHt+kTxr,"
}

module.exports={
    encrypt:function(pt){
        return crypt(getKey("")).encrypt(pt)
    },
    decrypt:function(ct){
        return crypt(getKey("")).decrypt(ct)
    }
}