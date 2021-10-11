import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as userTypes from  '../action-types/user.action.types';
import * as accountTypes from  '../action-types/account.action.types';
import * as errorTypes from '../action-types/error.action.types';
import * as util from '../utils'
import * as sessionHelper from '../utils/session.helper'
import config from '../config';

/**
 * 
 * @param {*} dispatch 
 * @param {*} type 
 * @param {*} data 
 * @param {*} error 
 * @param {*} message 
 * @param {*} recordsCount 
 */
const dispatchAction = (dispatch, type, data, error, message, recordsCount) => {
    dispatch({
        type,
        message,
        data,
        error,
        recordsCount
    });
};


export const initUserType = () => dispatch => {
    dispatchAction(dispatch, userTypes.USER_INIT, null, null, null, null);
};

export const saveUser = user => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.AUTH_URL + `shopping/user`;

    try {
        const data = (typeof user.id === 'undefined' || user.id === -1 ) ? await service.post(url, user, true)
                            : await service.put(url, user, true);
        if (data && !data.errorMessage) {

            if (typeof user.id === 'undefined') user.id = data.data.id;

            dispatchAction(dispatch, userTypes.USER_SAVE_SUCCESS, user, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'User updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};




export const getUserById = userId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        const data = await service.get('url' + '?id=' + userId);
    
        if (data && !data.errorMessage) {

            dispatchAction(dispatch, userTypes.USER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null,  util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};


export const getUsers = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `shopping/user?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url+`&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url+`&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url, true);
    
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, userTypes.USER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null,  util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteUsers = userIds => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.AUTH_URL + `shopping/user`;

    try {
        
        const data = await service._delete(url + '?id=' + userIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, userTypes.USER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout( () =>
            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'User(s) deleted successfully',
                error: undefined,
                notification: true
            }),500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const updateUserPassword = (user, password) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.AUTH_URL + `shopping/user/updatePassword`;

    const post = {
        id: user.id,
        password
    }

    try {
        const data =  await service.put(url, post, true);
        if (data && !data.errorMessage) {

            dispatchAction(dispatch, userTypes.USER_UPDATE_PASSWORD_SUCCESS, data.data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Password updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const saveVideoSettings = (id, autoPlay, quality, language, userId) => async dispatch => {

    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    
    let url = config.AUTH_URL + `coaching/user/video-settings/save`;

    const post = {
        autoPlay,
        quality,
        language,
        userId,
        id
    };

    try {
        const data =  typeof id === 'undefined' ? await service.post(url, post, true) : await service.put(url, post, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            const user = sessionHelper.getLoggedUser();

            user.videoSettings = {
                id: data.baseId,
                auto_play: autoPlay,
                video_quality: quality
            };

            sessionHelper.saveUser(user);

            dispatch({
                type: accountTypes.LOGIN_SUCCESS,
                user
            });
            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Playback Settings updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'User error'), null, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
