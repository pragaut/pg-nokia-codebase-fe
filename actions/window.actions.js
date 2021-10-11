import * as actionTypes from '../action-types/window.action.types';
import * as helper from '../helper';
import config from '../config';


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
const dispatchAction = (dispatch, type, width, productId) => {
    dispatch({
        type,
        width,
        productId
    });
};


export const changeWidth = width => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_WIDTH_CHANGED, width);
};


export const openCartWindow = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_CART_OPEN, -1);
};


export const closeCartWindow = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_CART_CLOSE, -1);
};


export const openAuthWindow = () => async dispatch => {
    // closing it permanently. We don't night right sider now
    dispatchAction(dispatch, actionTypes.AUTH_CLOSE, -1);
};


export const closeAuthWindow = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.AUTH_CLOSE, -1);
};


export const clickWindow = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_CLICKED, -1);
};


export const openQuickView = (productId) => async dispatch => {
    dispatchAction(dispatch, actionTypes.QUICK_VIEW_OPEN, -1, productId);
};


export const closeQuickView = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.QUICK_VIEW_CLOSE, -1);
};