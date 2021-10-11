import * as commonTypes from '../action-types/common.action.types'
import * as stickyTypes from '../action-types/sticky.popup.action.types';

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
const dispatchAction = (dispatch, type, error, message, notification) => {
    dispatch({
        type,
        message,
        error,
        notification
    });
};


export const showNotification = message => async dispatch => {
    dispatchAction(dispatch, stickyTypes.NOTIFICATION_SHOW, null, message, true);
};

export const hideNotification = () => async dispatch => {
    dispatchAction(dispatch, stickyTypes.NOTIFICATION_HIDE, null, '', false);
};

export const showSticky = html => async dispatch => {
    dispatchAction(dispatch, stickyTypes.STICKY_SHOW, null, html, false);
};

export const hideSticky = () => async dispatch => {
    dispatchAction(dispatch, stickyTypes.STICKY_HIDE, null, '', false);
};


export const showLoader = () => async dispatch => {
    dispatchAction(dispatch, stickyTypes.LOADING_SHOW, null, '', false);
};


export const hideLoader = () => async dispatch => {
    dispatchAction(dispatch, stickyTypes.LOADING_HIDE, null, '', false);
};
