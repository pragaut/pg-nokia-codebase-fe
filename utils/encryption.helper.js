import * as aes from 'crypto-js/aes';
import * as CryptoJS from 'crypto-js';
import { constants } from './constants';


export const encryptText = (textToEncrypt, key = '') => {
    //console.log("textToEncrypt : ", textToEncrypt)
    if (key === '') key = constants.ENCRYPTION_SALT;
    if (!textToEncrypt || textToEncrypt === '' || textToEncrypt == undefined || textToEncrypt === null) return '';

    return aes.encrypt(textToEncrypt, key);
};


export const decryptText = (textToDecrypt, key = '') => {
    if (key === '') key = constants.ENCRYPTION_SALT;
    if (!textToDecrypt || textToDecrypt === '') return '';

    return aes.decrypt(textToDecrypt, key).toString(CryptoJS.enc.Utf8);
};