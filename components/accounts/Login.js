import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { login, releaseErrorInfo } from '../../actions/account.actions';
import Wrapper from '../shared/Wrapper';
import style from '../../theme/app.scss';
import ForgotPassword from '../accounts/forgot-password';
import ChangePassword from '../accounts/change-password';
import PopUp from '../shared/PopUp';
import * as actionTypes from '../../action-types/account.action.types';
import Router from 'next/router';
import { enableAnalyticTracking } from '../../actions/window.actions';

class Login extends Wrapper {

    ForgotPop = PopUp(() =>{
        return(
            <ForgotPassword />
        )
    });

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            showBox: false,
            showForgot: false,

            message: '',
            title: '',
            dialogType: 1,
            showDialog: false,
            showError: false,
            showSticky: false
        };
    };

    onTextChange = key => event => {
        const state = {};

        state[key] = event.target.value;

        this.setState({
            ...state
        });
    };


    openClose = () => {
        if (this.state.showForgot === false){
            this.setState({
                showForgot: true
            });
        }
        else {
            this.setState({
                showForgot: false
            });
        }
    };


    _login = () => {
        this.props.login(this.state.userName, this.state.password);
        this.props.enableAnalyticTracking();
    };


    render() {



        const { type, error, message, data } = this.props;

            if (type === actionTypes.RESET_PASSWORD_SUCCESS){
                // setTimeout(() => {this.showSticky("Password Changed")}, 200);
            }

            if (type === actionTypes.LOGIN_SUCCESS){
                this.props.router.push(
                    {
                      pathname: '/courseList',
                      query: {
                        page: 'courseList'
                      },
                    },
                    '/courseList',
                  );
                }
                      

        return (
            <div style={{overflow: 'hidden'}}>    
                <div><button className={ [style.button, style.show_hand].join(' ') }>Google</button><button>Facebook</button></div>
                <input type='text' onChange={this.onTextChange('userName')} placeholder="UserName" />
                <input type='password' onChange={this.onTextChange('password')} placeholder="Password"/>
                <button onClick={this.openClose}>Forgot  Password</button>
                {
                    (this.state.showForgot && type !== actionTypes.RESET_PASSWORD_SUCCESS) &&
                    <div>
                        <this.ForgotPop close={()=>{this.setState({ showForgot: false })}}></this.ForgotPop>
                    </div>
                }

                

                <input type='button' onClick={this._login} value='Click'></input>
                
                {this.state.showDialog && this.showPopup('title', 'message', () => { this.setState({ showDialog: false }) })}

                {this.showError(error, 'Login', () => {
                    this.props.releaseErrorInfo();
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { type, error, user } = state.accountReducer;

    return { type, error, user };
};

export default withRouter(connect(mapStateToProps, { login, releaseErrorInfo, enableAnalyticTracking })(Login));