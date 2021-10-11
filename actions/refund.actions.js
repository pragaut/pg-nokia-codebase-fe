import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as refundTypes from '../action-types/refund.action.types';
import * as errorTypes from '../action-types/error.action.types';
import * as util from '../utils'
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



export const initRefundType = () => dispatch => {
    dispatchAction(dispatch, refundTypes.REFUND_INIT, null, null, null, null);
};

export const saveRefund = refund => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.PAYMENT_URL + `shopping/refund`;

    try {
        const data = (typeof refund.id === 'undefined' || refund.id === -1) ? await service.post(url, refund, true)
            : await service.put(url, refund, true);
        if (data && !data.errorMessage) {

            if (typeof refund.id === 'undefined') refund.id = data.data.id;

            dispatchAction(dispatch, refundTypes.REFUND_SAVE_SUCCESS, refund, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Refund updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Refund error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};




export const getRefundById = refundId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        const data = await service.get('url' + '?id=' + refundId);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, refundTypes.REFUND_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Refund error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};




export const getRefunds = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.PAYMENT_URL + `shopping/refund?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, refundTypes.REFUND_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Refund error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteRefunds = refundIds => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.PAYMENT_URL + `shopping/refund`;

    try {

        const data = await service._delete(url + '?id=' + refundIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, refundTypes.REFUND_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Refund(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Refund error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};





export const getRefundsByOrderId = (orderId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.PAYMENT_URL + `shopping/refund?pageIndex=${pageIndex}&rows=${rowsToReturn}&orderId=${orderId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, refundTypes.REFUND_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Refund get by Order ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};



export const getRefundsByUserId = (userId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.PAYMENT_URL + `shopping/refund?pageIndex=${pageIndex}&rows=${rowsToReturn}&userId=${userId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, refundTypes.REFUND_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Refund get by User ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};