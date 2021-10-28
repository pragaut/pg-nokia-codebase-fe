import React, { Component } from 'react';
import styled from 'styled-components';
import Gap from '../comman/Gap';
import config from '../../config'; 

const Close = styled.div`
    width: 32px;
    position: absolute;
    top: 18px;
    right: 12px;
    cursor: pointer;
    img{
      max-width: 100%;
    }
    @media screen and (max-width: 600px) {
        top: 40px;
        right: 20px;
    }
    @media (min-width: 0px) and (max-width: 767px) and (orientation : landscape){
      position: initial;
      margin-left: auto;
  }

`;

const InputDiv = styled.div`
    width:100%;
    padding: ${props => props.padding ? props.padding : "17px 23px 0px 23px"} ;
    display: ${props => props.Display ? props.Display : "block"} ; 
    text-align : ${props => props.textalign ? props.textalign : "left"};
   
    color:#6a6a6a;
    .buttonstyle{
       height:44px !important;
            box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4) !important;
            background-image: linear-gradient(to bottom, #a78b44, #775b21)  !important;
    }
    a{
        
            height: 16px;
            font-weight: bold;
            font-family: SuisseIntl;
            font-size: ${props => props.fontsize ? props.fontsize : "25px"};  
            font-stretch: normal;
            font-style: normal;
            line-height:${props => props.lineheight ? props.lineheight : " 3.33"};
            letter-spacing: normal;
            text-align: left;
            color: #6a6a6a; 
    }
`;
const Overlay = styled.div`
  z-index: 112;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(14, 13, 13, 0.84);
`;

const H1 = styled.h1`
   font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;

`;
const H2 = styled.h2`
  //height: 80px;
  font-family: Asap;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`;

const Wrapper = styled.div`
    position: fixed;
    right:0px;
    background-color:${props => props.bgColor ? props.bgColor : '#c3c3c3'} ;
    padding: 0px 0px; 
    width: ${props => props.width ? props.width : '50%'} ; 
    overflow-y: auto;
    overflow-x: hidden;
    @media screen and (max-width: 600px) {
      width: 100vw!important;
      height: auto !important;
      border-radius: 20px 20px 0px 0px;
      padding: 0px 0px;
      padding-bottom: 23.5px;
      top: unset;
      padding-top: 0px;
      overflow: auto;
      transform: translate(-50%, 0%);
    } 
  // @media (min-width: 0px) and (max-width: 767px) and (orientation : landscape){
  //     width: 100vw;
  //     height: 100vh;
  //     border-radius:0px;
  //     overflow: scroll;
  // }
  height: fit-content;
    box-sizing: border-box;
    min-height: 421px;
    border-radius: 20px; 
    z-index: 115;
    display:  ${props => props.visible ? 'block' : 'none'};
    box-shadow: -1px 1px 10px rgba(0,0,0,0.2);
    /* overflow-y: scroll; */
    transition: all .2s linear;
    left: 50%;
    bottom: 0px;
    top: 50%;
    transform: translate(-50%, -50%); 
    align-items: center;
    justify-content: center;
    flex-direction: column; */
/* 

    @media screen and (max-width: 767px){
     right: ${props => props.visible ? '0%' : '-100%'};
    } */
`;
class MotionSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillUnmount() {
    this.setState({ in: false });
  }

  render() {
    const { children, visible, close,bgColor,width, title, isSignup ,isSocialAuthVisible} = this.props;
    let crosshtmlcode="&#10005"; 
    return (
      <div>
        <div>
          <Wrapper bgColor={bgColor}  width={width} visible={visible}>
              <Close> <img src="../../static/close_new.png" onClick={close}/></Close>
                     
            <H2 dangerouslySetInnerHTML={{
              __html : `${title}`
            }}></H2> 
            {children}
          </Wrapper>
        </div> 
        {this.props.visible && <Overlay onClick={close} />}
      </div>
    );
  }
}

export default MotionSidebar;
