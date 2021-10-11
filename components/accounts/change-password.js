import React from 'react';
import { connect } from 'react-redux';
import { changePassword, changePasswordInit } from '../../actions/account.actions';
import Wrapper from '../shared/Wrapper';
import * as actionTypes from '../../action-types/account.action.types';
import style from '../../theme/app.scss';

class ChangePassword extends Wrapper {

    constructor(props){
        super(props);

        this.props.changePasswordInit();
    };

    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    onTextChange = key => event => {
        const state = {};

        state[key] = event.target.value;

        this.setState({
            ...state
        });
    };

    render() {
        
        const { type, user } = this.props;
                
        return (
            <div className={style.forgot_page_layout}>

                    <div className={style.email_inner_body}>
                        <div className={style.email_field}><input type="password"
                            placeholder="Old password"
                            onChange={this.onTextChange('oldPassword')}></input></div>
                        <div className={style.email_field}><input type="password"
                            placeholder="Enter new password"
                            onChange={this.onTextChange('newPassword')}></input></div>
                        <div className={style.email_field}><input type="password"
                            placeholder="Confirm new password"
                            onChange={this.onTextChange('confirmNewPassword')}></input></div>
                        <button className={style.confirm_btn} style={{ border: 'none'}} onClick={() => {
                            if (this.state.newPassword !== this.state.confirmNewPassword){
                                return alert("Passwords don't match")
                            }

                            if (this.state.newPassword.trim().length < 8) {
                                return alert("The new password should be of minimum 8 characters");
                            }

                            if (this.state.newPassword.trim() === this.state.oldPassword.trim()) {
                                return alert("The new password cannot be same as the old password");
                            }

                            this.props.changePassword(this.state.oldPassword, this.state.newPassword, this.state.confirmNewPassword);
                        }}>Confirm</button>
                    </div>

            </div>
        ); 
    }
}

const mapStateToProps = (state) => {
    const { type, error, user } = state.accountReducer;

    return { type, error, user };
}

export default connect(mapStateToProps,{ changePasswordInit, changePassword })(ChangePassword);