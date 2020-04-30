const crypt = require('simple-encryptor');

//REQUIRES CHANGES
function getKey(val){
    return val + ";[9,Tx.YHt+kTxr,"
}

function encrypt(pt){
    return require('btoa')(pt)
    //return crypt(getKey("")).encrypt(pt)
}

function decrypt(ct){
    return require('atob')(ct)
    // console.log('decrypt '+ct)
    // console.log(crypt(getKey("")).decrypt)
    // const res = crypt(getKey("")).decrypt(ct)
    // console.log(res)
    // return res
}

module.exports={
    encrypt,
    decrypt
}