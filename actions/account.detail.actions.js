import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as accountDetailTypes from '../action-types/account.detail.action.types';
import * as util from '../utils'
import config from '../config';
import * as errorTypes from '../action-types/error.action.types';
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



export const initAccountDetailType = () => dispatch => {
    dispatchAction(dispatch, accountDetailTypes.ACCOUNTDETAIL_INIT, null, null, null, null);
};

export const saveAccountDetail = accountDetail => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.SHOP_URL + 'shopping/accountDetail/';
        const data = (typeof accountDetail.id === 'undefined' || accountDetail.id === -1) ? await service.post(url, accountDetail, true)
            : await service.put(url, accountDetail, true);
        if (data && !data.errorMessage) {

            if (typeof accountDetail.id === 'undefined') accountDetail.id = data.data.id;

            dispatchAction(dispatch, accountDetailTypes.ACCOUNTDETAIL_SAVE_SUCCESS, accountDetail, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'AccountDetail updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AccountDetail error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};




export const getAccountDetailById = accountDetailId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.SHOP_URL + 'shopping/accountDetail';

        const data = await service.get(url + '?id=' + accountDetailId);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, accountDetailTypes.ACCOUNTDETAIL_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AccountDetail error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};




export const getAccountDetails = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.SHOP_URL + `shopping/accountDetail?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, accountDetailTypes.ACCOUNTDETAIL_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AccountDetail error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteAccountDetails = accountDetailIds => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.SHOP_URL + `shopping/accountDetail?id=${accountDetailIds}`;
        // const data = await service._delete(config.SHOP_URL + 'shopping/accountDetail?id=' + accountDetailIds, true);
        const data = await service._delete(url, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountDetailTypes.ACCOUNTDETAIL_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'AccountDetail(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AccountDetail error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};



export const getAccountDetailsByVendorId = (vendorId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.SHOP_URL + `shopping/accountDetail?pageIndex=${pageIndex}&rows=${rowsToReturn}&vendorId=${vendorId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url, true);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, accountDetailTypes.ACCOUNTDETAIL_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AccountDetail get by Vendor ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};



export const getAccountDetailsByUserId = (userId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.SHOP_URL_NEW + `shopping/accountDetail?pageIndex=${pageIndex}&rows=${rowsToReturn}&userId=${userId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        //const data = await service.get(url);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, accountDetailTypes.ACCOUNTDETAIL_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AccountDetail get by User ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};