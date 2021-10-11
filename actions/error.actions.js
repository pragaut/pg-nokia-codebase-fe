import * as errorTypes from '../action-types/error.action.types'


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


export const hideError = () => async dispatch => {
    dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, '', false);
};


export const showError = error => async dispatch => {
    dispatchAction(dispatch, errorTypes.SHOW_ERROR, error, '', false);
};
