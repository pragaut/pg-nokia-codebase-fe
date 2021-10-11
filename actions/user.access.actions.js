import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as userTypes from  '../action-types/user.access.action.types';
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


export const getUserAccessIds = (pageIndex, rowsToReturn, order, where) => async dispatch => {
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
            dispatchAction(dispatch, userTypes.USER_ACCESS_IDS_GET_SUCCESS, data.data, null, data.message, data.recordsCount);
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
