import React, { Component } from 'react';
import Wrapper from '../shared/Wrapper';
import styled from 'styled-components'; 


const WrapperSuccessfulMessage = styled.div`
    position: fixed;
    right:0px;
    background-color: #062201;
    padding: 0px 0px; 
    width: 60%; 
    z-index:1500;
    @media screen and (max-width: 600px) {
      width: 100vw!important;
      height: 421px !important;
      border-radius: 20px 20px 0px 0px;
      padding: 0px 0px;
      padding-bottom:0px;
      top: unset;
      padding-top: 0px;
      overflow: auto;
      transform: translate(-50%, 0%);
    } 
    box-sizing: border-box;
    height: 100px;
    border-radius: 10px; 
    display:  ${props => props.visible ? 'block' : 'none'};
    box-shadow: -1px 1px 10px rgba(0,0,0,0.2); 
    transition: all .2s linear;
    left: 50%;
    bottom: 0px;
    top: 20%;
    overflow:hidden;
    transform: translate(-50%, -0%); 
    align-items: center;
    justify-content: center;
    flex-direction: column; */ 
`;


const LoginsuccessfullMsg = styled.div`
display: flex;
padding : 0px;
height:100%;
justify-Content: center;
flex-Direction: column;
align-Items: center;
font-family: Asap;
font-size:  20px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
text-align: center;
color: #ffffff; 
`;

const Overlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0,0, 0.55);
`;

class MotionSidebar extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {
        this.setState({ in: false });
    }

    render() {
        const { visible, close, message, title } = this.props;

        const loggedIn = this.loggedUser();
        let crosshtmlcode = "&#10005";
        return (
            <div>
                <div>
                    <WrapperSuccessfulMessage visible={visible}>
                        <LoginsuccessfullMsg>
                            {message}
                        </LoginsuccessfullMsg>
                    </WrapperSuccessfulMessage>
                </div>
                {visible && <Overlay onClick={close} />}
            </div>
        );
    }
}

export default MotionSidebar;
