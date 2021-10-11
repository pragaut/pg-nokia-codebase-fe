import * as sessionHelper from '../utils/session.helper';
import * as commonTypes from '../action-types/common.action.types';
import * as userTypes from '../action-types/account.action.types';
import * as service from '../services/data.service';
import * as paymentTypes from '../action-types/payment.action.types';
import * as subscriptionTypes from '../action-types/subscription.action.types';
import * as errorTypes from '../action-types/error.action.types';
import * as util from '../utils';
import * as helper from '../helper';
import config from '../config';
import Router from 'next/router'

import * as ga from '../utils/ga.tagging';

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
export const initPaymentType = () => dispatch => {
    dispatchAction(dispatch, paymentTypes.PAYMENT_INIT, null, null, null, null);
};
export const savePayment = payment => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.PAYMENT_URL + `shopping/payment`;
    try {
        const data = (typeof payment.id === 'undefined' || payment.id === -1) ? await service.post(url, payment, true)
            : await service.put(url, payment, true);
        if (data && !data.errorMessage) {
            if (typeof payment.id === 'undefined') payment.id = data.data.id;
            dispatchAction(dispatch, paymentTypes.PAYMENT_SAVE_SUCCESS, payment, null, data.message, null);
            // dispatch({
            //     type: commonTypes.NOTIFICATION_SHOW,
            //     message: 'Payment updated successfully',
            //     error: undefined,
            //     notification: true
            // });
            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: {
                    title: 'Payment successful',
                    msg: 'Payment updated successfully',
                    image: 'PAYMENT_SUCCSESSFUL'
                },
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Payment error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getPaymentById = paymentId => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        const data = await service.get('url' + '?id=' + paymentId);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, paymentTypes.PAYMENT_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Payment error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getPayments = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {

        let url = config.PAYMENT_URL + `shopping/payment?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        if (order && order.length > 0) {
            url = url + `& order=${JSON.stringify(order)} `;
        }
        if (where && where.length > 0) {
            url = url + `& where=${JSON.stringify(where)} `;
        }
        const data = await service.get(url);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, paymentTypes.PAYMENT_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Payment error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deletePayments = paymentIds => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let url = config.PAYMENT_URL + `shopping/payment`;
    try {
        const data = await service._delete(url + '?id=' + paymentIds, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, paymentTypes.PAYMENT_DELETE_SUCCESS, null, null, null, data.message);
            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Payment(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Payment error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getPaymentsByOrderId = (orderId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.PAYMENT_URL + `shopping/payment?pageIndex=${pageIndex}&rows=${rowsToReturn}&orderId=${orderId}`;
        if (order && order.length > 0) {
            url = url + `& order=${JSON.stringify(order)} `;
        }
        if (where && where.length > 0) {
            url = url + `& where=${JSON.stringify(where)} `;
        }
        const data = await service.get(url);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, paymentTypes.PAYMENT_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Payment get by Order ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getPaymentsByUserId = (userId, pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.PAYMENT_URL + `shopping/payment?pageIndex=${pageIndex}&rows=${rowsToReturn}&userId=${userId}`;
        if (order && order.length > 0) {
            url = url + `& order=${JSON.stringify(order)} `;
        }
        if (where && where.length > 0) {
            url = url + `& where=${JSON.stringify(where)} `;
        }
        const data = await service.get(url);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, paymentTypes.PAYMENT_LIST_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Payment get by User ID error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getCoachingPlans = () => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        const data = await service.get(config.PAYMENT_URL + `reconciliation/payment/plans`, false);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, paymentTypes.PAYMENT_GET_PLANS_SUCCESS, data.data, null, data.message, undefined);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.HIDE_ERROR, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Payment plans list'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const openPaymentWindow = () => dispatch => {
    ga.payment_window_opened();
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    Router.push('/pricing-plans')
    dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
};

export const closePaymentWindow = () => dispatch => {
    dispatchAction(dispatch, paymentTypes.PAYMENT_WINDOW_CLOSE, null, null, null, null);
};

export const verifyPayment = (paymentId, subscriptionId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        const body = {
            razorPayId: paymentId
        };

        const data = await service.post(config.PAYMENT_URL + `reconciliation/payment/getRazorPayDetails`, body, true);
        if (data && !data.errorMessage) {
            const payment = data.data;
            const subscription = {
                subscriptionId,
                subscriptionStatus: 'active', // default : 'created', 
                cardHolderName: data.card ? data.card.name : '',
                cardNumber: data.card ? data.card.last4 : '',
                network: data.card ? data.card.network : '',
                method: payment.method,
                wallet: payment.wallet,
                bank: payment.bank,
                active: 1,
                nextCharge: helper.dateAdd(new Date(), 'year', 1),
                planId: process.env.PLAN,
            };


            const user = sessionHelper.getLoggedUser();

            user.subscription = subscription;

            sessionHelper.saveUser(user);

            dispatch({
                type: userTypes.LOGIN_SUCCESS,
                message: '',
                user,
                error: undefined,
                recordsCount: -1
            });


            // dispatch({
            //     type: 'modules/common/NOTIFICATION_SHOW',
            //     message: 'User subscribed successfully',
            //     error: undefined,
            //     notification: true
            // });

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: {
                    title: 'Payment successful',
                    msg: 'You are now subscribed to poker university. You can now start watching the amazing content',
                    image: 'PAYMENT_SUCCSESSFUL'
                },
                error: undefined,
                notification: true
            });

            dispatchAction(dispatch, paymentTypes.PAYMENT_WINDOW_CLOSE, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'verify payment'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

}


export const associateSubscriptionToUser = subscription => dispatch => {
    try {
        const user = sessionHelper.getLoggedUser();
        user.subscription = subscription;

        sessionHelper.saveUser(user);

        dispatch({
            type: userTypes.LOGIN_SUCCESS,
            message: '',
            user,
            error: undefined,
            recordsCount: -1
        });

        const utm_medium = sessionHelper.getUtm_Medium();
        if (utm_medium && (utm_medium === "adverticsmedia-fb" || utm_medium === "adverticsmedia")) {
            ga.purchase_utm_medium(utm_medium)
        }

        dispatchAction(dispatch, paymentTypes.PAYMENT_WINDOW_CLOSE, null, null, null, null);
        dispatchAction(dispatch, subscriptionTypes.SUBSCRIPTION_SUCCESS, null, null, null, null);

        dispatch({
            type: 'modules/common/NOTIFICATION_SHOW',
            message: 'User subscribed successfully',
            error: undefined,
            notification: true
        });
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};
