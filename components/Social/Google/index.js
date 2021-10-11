import { login_social } from '../../../actions/account.actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { Button, Icon } from 'semantic-ui-react';
import styles from '../../../theme/app.scss';
import config from '../../../config';


const Button = styled.div`
  /* width: 370px; */
  height:  55px;
  border-radius: 29px;
   border: ${props => props.border ? props.border :"solid 1px #707070"} ; 
   box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4);
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #eaeaea;
   cursor: pointer;
&:hover{
  background-color: #ffffff;
}

   img{
       width: ${props => props.width ? props.width :"30px"} ; 
       height: ${props => props.height ? props.height :"30px"} ; 
       margin-right: 8px;
   }
   span{ 
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: SuisseIntl;
        font-size:${props => props.fontsize ? props.fontsize :" 10px"} ; 
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 2.14;
        letter-spacing: normal;
        text-align: left;
        color: #1a1a1a; 
   }
   `;

class GoogleLogin extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.state = {
      disabled: true
    }
  }

  _socialLogin = (data) => {
    if (data.accessToken) {
      if (data.googleId) {
        this.props.login_social(data.profileObj.email, data.tokenId, 'google');
      } else {
      }
    }
  };


  componentDidMount() {
    const { clientId, cookiePolicy, loginHint, hostedDomain, autoLoad, isSignedIn, fetchBasicProfile, redirectUri, discoveryDocs, onFailure, uxMode, scope } = this.props
      ; ((d, s, id, cb) => {
        const element = d.getElementsByTagName(s)[0]
        const fjs = element
        let js = element
        js = d.createElement(s)
        js.id = id
        js.src = '//apis.google.com/js/client:platform.js'
        fjs.parentNode.insertBefore(js, fjs)
        js.onload = cb
      })(document, 'script', 'google-login', () => {
        const params = {
          client_id: clientId,
          cookie_policy: cookiePolicy,
          login_hint: loginHint,
          hosted_domain: hostedDomain,
          fetch_basic_profile: fetchBasicProfile,
          discoveryDocs,
          ux_mode: uxMode,
          redirect_uri: redirectUri,
          scope
        }
        window.gapi.load('auth2', () => {
          this.setState({
            disabled: false
          })
          if (!window.gapi.auth2.getAuthInstance()) {
            window.gapi.auth2.init(params).then(
              res => {
                if (isSignedIn && res.isSignedIn.get()) {
                  this._handleSigninSuccess(res.currentUser.get())
                }
              },
              err => onFailure(err)
            )
          }
          if (autoLoad) {
            this.signIn()
          }
        })
      })
  }
  signIn(e) {
    //console.log("google sign request");
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      const { onSuccess, onRequest, onFailure, prompt, responseType } = this.props
      const options = {
        prompt
      }
      onRequest()
      //console.log("google sign request - 2");
      if (responseType === 'code') {
        //console.log("google sign request - 3");
        auth2.grantOfflineAccess(options).then(res => onSuccess(res), err => onFailure(err))
      } else {
        //console.log("google sign request - 4");
        auth2.signIn(options).then(res => this._handleSigninSuccess(res), err => onFailure(err))
      }
    }
  }
  _handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
   
    const basicProfile = res.getBasicProfile()
    const authResponse = res.getAuthResponse()

    //console.log("Google authResponse" , authResponse);
    
      res.googleId = basicProfile.getId()
      res.tokenObj = authResponse
      res.tokenId = authResponse.id_token
      res.accessToken = authResponse.access_token
      res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    }
    this._socialLogin(res);
  }

  render() {
    const { tag, type, style, className, disabledStyle, buttonText, children } = this.props;
    const disabled = this.state.disabled || this.props.disabled;
    const initialStyle = {
      display: 'inline-block',
      borderRadius: '8px',
      marginRight: '0%',
      width: '100%',
    };
    const styleProp = (() => {
      if (style) {
        return style;
      } else if (className && !style) {
        return {};
      }
      return initialStyle;
    })()
    const defaultStyle = (() => {
      if (disabled) {
        return Object.assign({}, styleProp, disabledStyle);
      }
      return styleProp;
    })()
    const props = {
      onClick: this.signIn,
      style: defaultStyle,
      type,
      disabled,
      className,
      color: 'google plus'
    };


    return (<div {...props}>
      <Button width={this.props.width} fontsize={this.props.fontsize} height={this.props.height} border ={this.props.border}><img src={config.s3bucket_coaching_static_images + 'google_login.png'} /> <span>Google</span></Button>
    </div>);

  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  type: PropTypes.string
}

GoogleLogin.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Login with Google',
  scope: 'profile email',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6
  },
  onRequest: () => { }
}






const mapStateToProps = (state) => {
  const { type, error, user } = state.accountReducer;

  return { type, error, user };
};

export default connect(mapStateToProps, { login_social })(GoogleLogin);
