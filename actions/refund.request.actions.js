import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as refundRequestTypes from '../action-types/refund.request.types';
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



export const initRefundRequestType = () => dispatch => {
    dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_INIT, null, null, null, null);
};

export const saveRefundRequest = refundRequest => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    let url = config.SHOP_URL + `shopping/refundRequest`;
    const post = {
        id: refundRequest.id,
        orderLineItemId: refundRequest.orderLineItemId,
        reason: refundRequest.reason,
        notes: refundRequest.notes,
        raisedBy: refundRequest.raisedBy
    };

    try {
        const data = (typeof refundRequest.id === 'undefined' || refundRequest.id === -1) ? await service.post(url, post, true)
        : await service.put(url, post, true);        
        if (data && !data.errorMessage) {

            if (typeof refundRequest.id === 'undefined') refundRequest.id = data.data.id;

            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_SAVE_SUCCESS, data.data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'RefundRequest updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const approveRefundRequest = refundRequestId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    let url = config.SHOP_URL + `shopping/refundRequest/approve`;
    const post = {
        refundRequestId
    };

    try {
        const data = await service.post(url, post, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_APPROVE_SUCCESS, data.data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'RefundRequest approved successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const rejectRefundRequest = refundRequestId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    let url = config.SHOP_URL + `shopping/refundRequest/reject`;
    const post = {
        refundRequestId
    };

    try {
        const data = await service.post(url, post, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_REJECT_SUCCESS, data.data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'RefundRequest rejected successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getRefundRequestById = refundRequestId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        const data = await service.get('url' + '?id=' + refundRequestId);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};




export const getRefundRequests = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.SHOP_URL + `shopping/refundRequest?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteRefundRequests = refundRequestIds => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.SHOP_URL + `shopping/refundRequest`;

    try {

        const data = await service._delete(url + '?id=' + refundRequestIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'RefundRequest(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};





export const getRefundRequestsByOrderLineItemId = (orderLineItemId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.SHOP_URL + `shopping/refundRequest?pageIndex=${pageIndex}&rows=${rowsToReturn}&orderLineItemId=${orderLineItemId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest get by OrderLineItem ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};





export const getRefundRequestsByUserId = (userId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.SHOP_URL + `shopping/refundRequest?pageIndex=${pageIndex}&rows=${rowsToReturn}&userId=${userId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, refundRequestTypes.REFUNDREQUEST_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'RefundRequest get by OrderLineItem ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};





