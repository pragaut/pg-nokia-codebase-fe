import { constants } from './constants';
import * as encryption from './encryption.helper';

const shouldTextBeEncrypted = constants.USE_ENCRYPTION;
const sessionKeys = constants.SESSION_KEYS;

import window from 'global';


/**
* faker for ssr
*/
const localStorage = window.localStorage || {
    getItem: key => {
        return {}
    },
    setItem: (key, value) => { },
    removeItem: key => { }
};

export const saveInSession = (key, value) => {
    //console.log("encryption.encryptText(value)  : ", value);
    //alert(encryption.encryptText(value));
    localStorage.setItem(key, (shouldTextBeEncrypted === true) ? encryption.encryptText(value) : value);
};

export const getFromSession = (key) => {
    const item = localStorage.getItem(key);
    return (shouldTextBeEncrypted === true ? encryption.decryptText(item) : item);
};

export const removeItemFromSession = (key) => {
    localStorage.removeItem(key);
};

export const getLoggedUser = () => {
    const loggedUserJSON = getFromSession(sessionKeys.LOGGED_USER);

    if (loggedUserJSON && (typeof loggedUserJSON === "string")) {
        const parsedData = JSON.parse(loggedUserJSON);
        if (parsedData && parsedData.id) {
            return parsedData;
        }
        return null;
    }
    return null;
};


export const getCartItems = () => {
    const items = getFromSession(sessionKeys.CART_ITEMS);

    if (items && (typeof items === "string")) {
        const parsedData = JSON.parse(items);

        if (parsedData && parsedData.length > 0) {
            return parsedData;
        }
        return [];
    }
    return [];
};

export const getCampaignData = () => {
    const items = getFromSession(sessionKeys.CAMPAIGN_DATA);
    //return items;
    //if (items && (typeof items === "string")) {
    if (items) {
        const parsedData = JSON.parse(items);
        if (parsedData) {
            return parsedData;
        }
        return [];
    }
    return [];
};


export const getLoggedUserEmail = () => {
    return getFromSession(sessionKeys.LOGGED_USER_EMAIL);
};

export const getOnbordingScreensStatus = () => {
    return getFromSession(sessionKeys.ONBORDING_SCREENS_STATUS);
};

export const getLoginCount = () => {
    return getFromSession(sessionKeys.LOGIN_COUNT);
};

export const getUtm_Medium = () => {
    return getFromSession(sessionKeys.UTM_MEDIUM);
};

export const getUserFullName = () => {
    return getFromSession(sessionKeys.USER_FULLNAME);
};

export const getLoggedUserRole = () => {
    return getFromSession(sessionKeys.USER_LOGGEDROLE);
};


export const getLoggedUserRole_JSONConverted = () => {
    const items = getFromSession(sessionKeys.USER_LOGGEDROLE);
    //return items;
    //if (items && (typeof items === "string")) {
    if (items) {
        const parsedData = JSON.parse(items);
        if (parsedData) {
            return parsedData;
        }
        return [];
    }
    return [];
};


export const getUserNameType = () => {
    return getFromSession(sessionKeys.USER_NAME_TYPE);
};

export const getAuthType = () => {
    return getFromSession(sessionKeys.AUTH_TYPE);
};

export const getReferralCode = () => {
    return getFromSession(sessionKeys.REFERRAL_CODE);
};


export const saveUser = (user) => {
    if (user.token) {
        saveToken(user.token);
        saveRefreshToken(user.refreshToken);
        saveInSession(sessionKeys.LOGGED_USER, JSON.stringify(user.user));
    }
    else {
        saveInSession(sessionKeys.LOGGED_USER, JSON.stringify(user));
    }
};
export const saveCurrent_YearType_Year_IsCentralPlantCompany = (data) => { 
        saveInSession(sessionKeys.CURRENT_YEAR_YEARTYPE_ISCENTRALPLANCOMPANY, JSON.stringify(data));
}; 
export const getCurrent_YearType_Year_IsCentralPlantCompany = () => {
    const items = getFromSession(sessionKeys.CURRENT_YEAR_YEARTYPE_ISCENTRALPLANCOMPANY);
    //return items;
    //if (items && (typeof items === "string")) {
    if (items) {
        const parsedData = JSON.parse(items);
        if (parsedData) {
            return parsedData;
        }
        return [];
    }
    return [];
};



export const logOut = () => {
    localStorage.removeItem(sessionKeys.LOGGED_USER);
    localStorage.removeItem(sessionKeys.TOKEN);
    localStorage.removeItem(sessionKeys.PASSWORD_TOKEN);
    localStorage.removeItem(sessionKeys.REFRESH_TOKEN);
    localStorage.removeItem(sessionKeys.ONBORDING_SCREENS_STATUS);
    localStorage.removeItem(sessionKeys.USER_NAME_TYPE);
    localStorage.removeItem(sessionKeys.USER_FULLNAME);
    localStorage.removeItem(sessionKeys.USER_LOGGEDROLE);
}


export const removeLoggedUserRole = () => {
    localStorage.removeItem(sessionKeys.USER_LOGGEDROLE);
}

export const saveTempUser = tempUser => {
    saveInSession(sessionKeys.TEMP_USER, tempUser);
};

export const saveEmail = (email) => {
    saveInSession(sessionKeys.LOGGED_USER_EMAIL, email);
};


export const saveUserNameType = (UserNameType) => {
    saveInSession(sessionKeys.USER_NAME_TYPE, UserNameType);
};

export const saveReferrals = code => {
    saveInSession(sessionKeys.REFERRAL_CODE, code);
};


export const saveRoleDetailsOfLoggedUser = role => {
    saveInSession(sessionKeys.USER_LOGGEDROLE, JSON.stringify(role));
};


export const saveTempDeviceId = deviceId => {
    return saveInSession(sessionKeys.DEVICE_ID, deviceId);
};

export const saveSelectedAuditDetailsId = (selectedAuditDetailsId) => {
    saveInSession(sessionKeys.SELECTED_AUDITPLANDETAILSID, selectedAuditDetailsId);
};

export const getSelectedAuditDetailsId = () => {
    return getFromSession(sessionKeys.SELECTED_AUDITPLANDETAILSID);
};

export const saveSelectedProcessFlow = (selectedProcessFlow) => {
    if (selectedProcessFlow !== undefined && selectedProcessFlow !== 'undefined' && selectedProcessFlow !== '' && selectedProcessFlow != null) {
        saveInSession(sessionKeys.SELECTED_PROCESSFLOW, JSON.stringify(selectedProcessFlow));
    }
    else {
        saveInSession(sessionKeys.SELECTED_PROCESSFLOW, selectedProcessFlow);
    }
};

export const getSelectedProcessFlow = () => {
    const selectedProcessFlow = getFromSession(sessionKeys.SELECTED_PROCESSFLOW)
    if (selectedProcessFlow && (typeof selectedProcessFlow === "string")) {
        const parsedData = JSON.parse(selectedProcessFlow);
        if (parsedData) {
            return parsedData;
        }
        return [];
    }
    else {
        return selectedProcessFlow;
    }
};

export const saveSelfAuditPlanId = planId => {
    return saveInSession(sessionKeys.SELECTED_SELFAUDIT_PLANID, planId);
};
export const saveSelfAuditMultiSectionID = multiSectionId => {
    return saveInSession(sessionKeys.SELECTED_SELFAUDIT_MULTISECTION, multiSectionId);
};

export const getSelfAuditPlanId = () => {
    return getFromSession(sessionKeys.SELECTED_SELFAUDIT_PLANID)
};

export const getSelfAuditMultiSectionID = () => {
    return getFromSession(sessionKeys.SELECTED_SELFAUDIT_MULTISECTION)
};
export const getTempDeviceId = () => {
    return getFromSession(sessionKeys.DEVICE_ID)
};

export const getToken = () => {
    return localStorage.getItem(sessionKeys.TOKEN);
};

export const getTempUser = () => {
    return getFromSession(sessionKeys.TEMP_USER);
};

export const getRefreshToken = () => {
    return localStorage.getItem(sessionKeys.REFRESH_TOKEN);
};


export const saveToken = (token) => {
    return localStorage.setItem(sessionKeys.TOKEN, token);
};


export const saveRefreshToken = (token) => {
    return localStorage.setItem(sessionKeys.REFRESH_TOKEN, token);
};





export const getLoggedUserId = () => {
    const user = getLoggedUser();
    if (!user) {
        return -1;
    }
    return user.id;
};

export const isLoggedIn = () => {
    return !!getLoggedUser();
};

