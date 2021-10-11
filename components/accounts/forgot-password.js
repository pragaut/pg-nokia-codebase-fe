import React from 'react';
import { connect } from 'react-redux';
import { forgotPassword, verifyPasswordOtp, resetPassword, forgotPasswordInit, releaseErrorInfo } from '../../actions/account.actions';
import * as sessionHelper from '../../utils/session.helper';
import constants from '../../utils/constants';
import Wrapper from '../shared/Wrapper';
import * as actionTypes from '../../action-types/account.action.types';
import style from '../../theme/app.scss';

class ForgotPassword extends Wrapper {

    constructor(props){
        super(props);

        this.props.forgotPasswordInit();
    };

    state = {
        email:'',
        otp: '',
        password: '',
        confirm_password: ''
    };

    onTextChange = key => event => {
        const state = {};

        state[key] = event.target.value;

        this.setState({
            ...state
        });
    };

    _forgotPassword = event => {
        this.props.forgotPassword(this.state.email);
    };

    _resetPassword = event =>{
        this.props.resetPassword(this.state.password, this.state.confirm_password);
    };

    _verifyPasswordOtp = event => {
        this.props.verifyPasswordOtp(this.state.otp);
    };

    render() {

        const { type, error, message, data } = this.props;
        
        return (
            <div className={style.forgot_page_layout}>
                {type === actionTypes.RESET_PASSWORD_RAISE_REQUEST && this.showLoader()}
                {type === actionTypes.VERIFY_PASSWORD_OTP_REQUEST && this.showLoader()}

                {type === actionTypes.RESET_PASSWORD_INIT &&
                    <div className={style.email_inner_body}>
                        <div className={style.email_field}><input type="email"
                            placeholder="Enter your email to reset password"
                            onChange={this.onTextChange('email')}></input></div>
                        <div className={style.confirm_btn} onClick={this._forgotPassword}>Confirm</div>
                    </div>
                }

                {type === actionTypes.RESET_PASSWORD_RAISE_SUCCESS &&
                    <div className={style.otp_inner_body}>
                        <div className={style.email_field}><input placeholder="Please enter otp" onChange={this.onTextChange('otp')} /></div>
                        <div className={style.confirm_btn} onClick={this._verifyPasswordOtp}>Verify</div>
                        <br />
                        <a className={[style.otp_resend, style.underline].join(' ')}>Resend</a>
                    </div>
                }

                {type === actionTypes.VERIFY_PASSWORD_OTP_SUCCESS &&
                    <div className={style.generate_new_password}>
                        <div className={style.email_field}><input placeholder="New Password" onChange={this.onTextChange('password')} /></div>
                        <div className={style.email_field}><input placeholder="Confirm New Password" onChange={this.onTextChange('confirm_password')} /></div>
                        <div className={style.confirm_btn} onClick={this._resetPassword}>Confirm</div>
                    </div>
                }
            </div>
        ); 
    }
}

const mapStateToProps = (state) => {
    const { type, error, user } = state.accountReducer;

    return { type, error, user };
}


export default connect(mapStateToProps,{ forgotPasswordInit, forgotPassword, verifyPasswordOtp, resetPassword,releaseErrorInfo })(ForgotPassword);