require('dotenv').config();
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTRKEY);

function encryptString(private) {
    return cryptr.encrypt(private)
}

function decryptString(private) {
    return cryptr.decrypt(private)
}


module.exports = {
    encryptString: encryptString,
    decryptString: decryptString,
};