import * as commonTypes from '../../action-types/common.action.types';
import * as service from '../../services/data.service';
import * as categoryTypes from '../../action-types/shopping/category.action.types';
import * as util from '../../utils'
import config from '../../config';
import * as errorTypes from '../../action-types/error.action.types';



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



export const initCategoryType = () => dispatch => {
    dispatchAction(dispatch, categoryTypes.CATEGORY_INIT, null, null, null, null);
};

export const saveCategory = category => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.SHOP_URL + `shopping/category`;

    try {
        const data = (typeof category.id === 'undefined' || category.id === -1) ? await service.post(url, category, true)
            : await service.put(url, category, true);
        if (data && !data.errorMessage) {
            if (typeof category.id === 'undefined') category.id = data.data.id;

            dispatchAction(dispatch, categoryTypes.CATEGORY_SAVE_SUCCESS, data.data, null, data.message, null);
            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Category updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Category error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};




export const getCategoryById = categoryId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        const data = await service.get('url' + '?id=' + categoryId);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, categoryTypes.CATEGORY_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Category error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};




export const getCategories = (pageIndex, rowsToReturn, order, where, nameField) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.SHOP_URL + `shopping/category?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        if (nameField && nameField.length > 0) {
            url = url + `&nameField=${JSON.stringify(nameField)}`;
        }

        const data = await service.get(url);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, categoryTypes.CATEGORY_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Category error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteCategories = categoryIds => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.SHOP_URL + `shopping/category`;

    try {

        const data = await service._delete(url + '?ids=' + categoryIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, categoryTypes.CATEGORY_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Category(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Category error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getCategoriesByProductId = (productId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        let url = config.SHOP_URL + `shopping/category?pageIndex=${pageIndex}&rows=${rowsToReturn}&productId=${productId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, categoryTypes.CATEGORY_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Category get by Product ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};
