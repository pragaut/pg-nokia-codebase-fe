import * as sessionManager from './session.helper';


/**
 * this function will return us a header with token info.
 * 
 * @param {*} guarded the boolean to decide if we will returning the header with open route key or the auth token
 * @returns the header object with the respective auth token/key
 */
export const getTokenHeader = guarded => {
    return {
       'x-access-token': guarded ? sessionManager.getToken() : process.env.OPR_KEY
    };
};


/**
 * @returns the header object with user-id
 */
export const getUserHeader = () => {
    return {
       'user-id': sessionManager.getLoggedUserId()
    };
};

/**
 * @returns the header representing header
 */
export const getJSONHeader = () => {
    return {
       'content-type': 'application/json'
    };
};

/**
 * @returns the header representing header
 */
export const getEncodingHeader = () => {
    return {
        'accept-encoding': 'gzip,deflate'
    };
};

/**
 * @returns the opr header. opr header is the token header with the opr key. opr key will be used to validate the request  
 */
export const getOPRHeader = () => {
    return {
        'x-access-token': process.env.OPR_KEY
     };
};
/**
 * 
 * @param {*} guarded guarded means we need to include the header for the requests that needs authentication. The open requests will need opr header instead
 * 
 * @returns the header object with all the mandatory headers like token, json, and user header
 */
export const getMandatoryRequestHeaders = guarded => {
    const mandatoryUserHeader = getUserHeader();
    const mandatoryTokenHeader = getTokenHeader(guarded);
    const mandatoryJSONHeader = getJSONHeader();
    const mandatoryEncodingHeader = getEncodingHeader();

    // inject opr key to avoid any malicious call (weak but some security)
    return guarded ? Object.assign({}, mandatoryTokenHeader, mandatoryUserHeader, mandatoryJSONHeader,mandatoryEncodingHeader)
            : Object.assign({}, mandatoryTokenHeader, mandatoryJSONHeader,mandatoryEncodingHeader);
};


/**
 * 
 * @param {*} headers 
 * 
 * @returns includes the headers to a header object,
 */
export const includeMandatoryRequestHeaders = headers => {
    const newHeaderObject = Object.assign({}, header);
    return Object.assign(newHeaderObject, getMandatoryRequestHeaders());
};


export const validateEmailFormat = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};


export const validateNumber = number => {
    return !isNaN(number);
};


export const validateDate = date => {
    return !isNaN(Date.parse(date)) && Date.parse(date) > -19800000 && Date.parse(date) < 1893456000000;
};


/**
 * 
 * @param {*} password the password which needs to be validated
 * 
 * returns a boolean confirming if the supplied password is a valid password or not. Ideally, the password should be minimum 8 characters and should consist 1 capital case, 1 lowe case letter, 1 number, and 1 special character
 */
export const validatePassword = password => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return password.length > 7 && regex.test(String(password).toLowerCase());
};


/**
 * 
 * @param {*} file file will be the object retreived from the input type = file tag
 * 
 * returns if the selected file is a valid image or not
 */
export const isValidImage = file => {
   const typeArray = file.type.split('/');
   return typeArray.length === 2 && typeArray[0] === 'image';
};


/**
 * 
 * @param {*} file file will be the object retreived from the input type = file tag
 * 
 * returns the extension of the file
 */
export const getExtension = file => {
    const lastDotIndex = file.name.lastIndexOf('.');
    return file.name.substring(lastDotIndex + 1);
};


export const generateError = (message, code, title) => {
    const error = new Error(message);
    error.code = code;
    error.title = title;

    return error;
};

export const generateError_WithousStack = (message, code, title) => {
    const error = new Error(message);
    error.code = code;
    error.title = title;

    return error;
};


export const uniqueId = prefix => {
    return (prefix ? prefix + '-' : '') + (new Date().getTime()).toString(36) + (new Date().getTime() + Math.floor(Math.random() * 100000)).toString(36);
};