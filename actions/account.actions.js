import * as accountTypes from '../action-types/account.action.types'
import config from '../config';
import * as service from '../services/data.service';
import { constants } from '../utils/constants';
import * as sessionHelper from '../utils/session.helper';
import * as commonTypes from '../action-types/common.action.types';
import * as windowTypes from '../action-types/window.action.types';
import { LOGIN_SUCCESS } from '../action-types/account.action.types';
import * as util from '../utils';
import * as errorTypes from '../action-types/error.action.types';
import { loggedIn, registered } from '../utils/ga.tagging';


/**
 * 
 * @param {*} dispatch 
 * @param {*} type 
 * @param {*} user 
 * @param {*} users 
 * @param {*} error 
 * @param {*} message 
 * @param {*} recordsCount 
 */
const dispatchAction = (dispatch, type, user, users, error, message, recordsCount) => {
    dispatch({
        type,
        user,
        users,
        message,
        error,
        recordsCount
    });
};


export const registerAccountInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.REGISTER_INIT, null, null, null, null);
};


export const saveUser = user => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        const data = await service.put(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.USER_SAVE, user, true);

        if (data && !data.errorMessage) {
            const _user = sessionHelper.getLoggedUser();
            const finalUser = {
                ..._user,
                ...user
            };

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: {
                    msg: 'User saved successfully',
                    image: 'CHANGE_NAME'
                },
                error: undefined,
                notification: true
            });

            sessionHelper.saveUser(finalUser);
            dispatchAction(dispatch, accountTypes.USER_SAVE_SUCCESS, finalUser, null, null, data.message);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
}



export const registerAccount = (userName, password, firstName, lastName, mobile, source) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);


    // let's try to get the referred by code, if any from session

    const referredByCode = sessionHelper.getReferralCode();

    const post = {
        email: userName,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        password: password,
        source,
        referredByCode
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.REGISTER_ACCOUNT, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.REGISTER_REQUEST, data.data, null, null, data.message);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.id);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: {
                    msg: 'Registration is successfull. Please check your inbox for otp to confirm your email address',
                    image: 'REGISTRATION_SUCCSESSFUL'
                },
                error: undefined,
                notification: true
            });

            registered(userName);

        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data.errorMessage, data.code, 'Registration error'), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};


export const verifyOtpInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.VERIFY_OTP_INIT, null, null, null, null);
};

export const verifyEmailOtp = (otp) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_EMAIL_OTP, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.REGISTER_SUCCESS, null, null, null, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Email id is verified. Please login to continue',
                error: undefined,
                notification: true
            });

            dispatchAction(dispatch, windowTypes.AUTH_OPEN, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};


export const verifyMobileOtp = (otp) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_MOBILE_OTP, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.VERIFY_MOBILE_OTP_SUCCESS, null, null, null, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, accountTypes.VERIFY_MOBILE_OTP_ERROR, null, null, new Error(data.errorMessage), null);
        }

    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const login = (userName, password) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    alert('kk')
    const post = {
        email: userName,
        password
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.LOGIN, post, false);
        if (data && !data.errorMessage) {
            sessionHelper.saveUser(data.data);

            loggedIn(userName);

            //dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
            dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data.data.user, null, null, data.message);
            //dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data.errorMessage, data.code, 'Login not successful'), null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error);
    }
};


export const login_social = (email, token, authType, userId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    // let's try to get the referred by code, if any from session

    const referredByCode = sessionHelper.getReferralCode();

    const post = {
        email,
        token,
        authType,
        referredByCode
    };

    if (userId) {
        post.facebookUserId = userId;
    }

    try {

        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.LOGIN, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);

            loggedIn(email);

            setTimeout(() => {
                sessionHelper.saveUser(data.data);
                dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data.data.user, null, null, data.message);
                dispatchAction(dispatch, windowTypes.WINDOW_REDIRECT_TO_COURSES, null, null, null, null);
            }, 200);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error);
    }
};


export const forgotPasswordInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.RESET_PASSWORD_INIT, null, null, null, null);
};


export const forgotPassword = email => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    const post = {
        email
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.FORGOT_PASSWORD, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.RESET_PASSWORD_RAISE_SUCCESS, data.data, null, null, data.message);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.userId);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, commonTypes.NOTIFICATION_SHOW, null, null, null, data.message);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};


export const verifyPasswordOtp = (otp) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp
    };


    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_PASSWORD_OTP, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.VERIFY_PASSWORD_OTP_SUCCESS, null, null, null, null);
            sessionHelper.saveInSession(constants.SESSION_KEYS.PASSWORD_TOKEN, data.data.passwordToken);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};


export const resetPassword = (password, confirm_password) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);


    if (!password || !confirm_password) {
        return dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error('Please provide correct input for password and confirm password'), null);
    }


    if (password.trim().length < 8) {
        return dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error('Password should be of minimum 8 length'), null);
    }

    if (confirm_password.trim().localeCompare(password.trim())) {
        return dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error('Password and confirm password do not match'), null);
    }

    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        passwordToken: sessionHelper.getFromSession(constants.SESSION_KEYS.PASSWORD_TOKEN),
        password: password,
        confirmPassword: confirm_password

    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.RESET_PASSWORD, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.RESET_PASSWORD_SUCCESS, data.data, null, null, data.message);
            dispatchAction(dispatch, commonTypes.NOTIFICATION_SHOW, null, null, null, data.message);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};


export const releaseErrorInfo = () => dispatch => {
    dispatchAction(dispatch, accountTypes.LOGIN_NO_NOTIFICATION, null, null, null, '', 0);
};


export const errored = (error) => dispatch => {

    if (error.code === 352) {
        // jwt expired


    }

    dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
};

export const dispatchUserInfo = user => dispatch => {
    dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, user, null, null, '');
};


export const changePasswordInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.CHANGE_PASSWORD_INIT, null, null, null, null);
};


export const changePassword = (oldPassword, newPassword, confirmNewPassword) => async dispatch => {
    dispatchAction(dispatch, accountTypes.CHANGE_PASSWORD_REQUEST, null, null, null, null);
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);


    const post = {
        password: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.CHANGE_PASSWORD, post, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.CHANGE_PASSWORD_SUCCESS, data.data, null, null, data.message);

            const user = sessionHelper.getLoggedUser();
            // let's save back the user

            sessionHelper.saveUser(user);

            // and dispatch an action to reflect that in store too
            dispatch({
                type: LOGIN_SUCCESS,
                user
            });
            dispatchAction(dispatch, commonTypes.NOTIFICATION_SHOW, null, null, null, data.message);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};
