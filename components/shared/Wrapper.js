import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dialog } from './Dialog';
import PopUp from './PopUp';
import Loader from './loader';
import * as commonTypes from '../../action-types/common.action.types';
import * as sessionHelper from '../../utils/session.helper';
import rules from "../../utils/rbac.rules.helper"; 
import * as _ from "lodash";

class Wrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            showError: false,
            showConfirm: false,
            showSticky: false
        }
    }

    checkIsAuthorizedUser = (role, action, data) => {
        const permissions = rules[role];
        if (!permissions) {
            // role is not present in the rules
            return false;
        }

        const staticPermissions = permissions.static;

        if (staticPermissions && staticPermissions.includes(action)) {
            // static rule not provided for action
            return true;
        }

        const dynamicPermissions = permissions.dynamic;

        if (dynamicPermissions) {
            const permissionCondition = dynamicPermissions[action];
            if (!permissionCondition) {
                // dynamic rule not provided for action
                return false;
            }

            return permissionCondition(data);
        }
        return false;
    };

    saveInSession = (SessionID, SessionValue) => {
        sessionHelper.saveInSession(SessionID, SessionValue);
    }
    orderByInArrayObject = (key, data) => {
        const datad = data && data.length > 0 && _.sortBy(data, key).map(application => {
            return application;
        })
        return datad;
    }
    getFromSession = (SessionID) => {
        sessionHelper.getFromSession(SessionID);
    }

    loggedUser = () => {
        return sessionHelper.getLoggedUser();
    };


    isLoggedIn = () => {
        return !!this.loggedUser();
    };

    killUser = () => {
        sessionHelper.saveUser({});
    };

    getUserFullName = () => {
        return sessionHelper.getUserFullName();
    }
    convertStringdataToArrayList = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }

    convertArrayListToStringData = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    SaveLoggedUserRole = (role) => {
        sessionHelper.saveRoleDetailsOfLoggedUser(role);
    }

    saveSelectedAuditDetailsId = (SelectedAuditDetailsId) => {
        sessionHelper.saveSelectedAuditDetailsId(SelectedAuditDetailsId);
    }

    getSelectedAuditDetailsId = () => {
        return sessionHelper.getSelectedAuditDetailsId();
    }

    saveSelectedProcessFlow = (selectedProcessFlow) => {
        sessionHelper.saveSelectedProcessFlow(selectedProcessFlow);
    }

    getSelectedProcessFlow = () => {
        return sessionHelper.getSelectedProcessFlow();
    }

    getLoggedUserRole = () => {
        return sessionHelper.getLoggedUserRole();
    }

    getLoggedUserRole_JSONConverted = () => {
        return sessionHelper.getLoggedUserRole_JSONConverted();
    }
    getCurrent_YearType_Year_IsCentralPlantCompany = () => {
        return sessionHelper.getCurrent_YearType_Year_IsCentralPlantCompany();
    }
    getUserNameType = () => {
        return sessionHelper.getUserNameType();
    }

    saveUserNameType = (UserNameType) => {
        sessionHelper.saveUserNameType(UserNameType);
    };

    getAuthType = () => {
        return sessionHelper.getAuthType();
    }

    showError = (error, source, onActionTaken) => {
        if (!error) {
            return '';
        }
        const title = error.title ? error.title : 'Error found' + (source ? ' in ' + source : '');
        const message = error.message;

        return this.showPopup(title, message, onActionTaken)
    };
    getFileNameFromPath = (str) => {
        return str.split('\\').pop().split('/').pop();
    }
    displayError = (error, source, onActionTaken) => {
        if (!error) {
            return '';
        }
        const title = error.title ? error.title : 'Error found' + (source ? ' in ' + source : '');
        const message = error.message;

        return error
        //return this.showPopup(title, message, onActionTaken)
    };

    showPopup = (title, message, onActionTaken) => {
        if (typeof message !== 'undefined') {
            return <Dialog close={onActionTaken} title={title} message={message} ></Dialog>
        }
        else {
            return '';
        }
    };


    LoaderPopUp = PopUp(() => {
        return <Loader />
    });


    RaisePopup = () => {
        store._store.dispatch({ type: commonTypes.LOADING_SHOW });
    };

    showLoader = (title) => {
        return <this.LoaderPopUp title={title} hideCloseButton={true} showAbove={true} />
    };

    getUniqueArrayFromArrayObject = (arr, keyProps) => {
        const kvArray = arr.map(entry => {
            const key = keyProps.map(k => entry[k]).join('|');
            return [key, entry];
        });
        const map = new Map(kvArray);
        return Array.from(map.values());
    }

}

export default Wrapper;