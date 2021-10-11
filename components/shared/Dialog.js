import React, { Component } from 'react';
import config from '../../utils/config';
import style from '../../theme/app.scss';

import styled from 'styled-components';

const OverlayWrapper = styled.div`
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgb(32, 32, 32, .88);
   position: fixed;
   z-index: 1000;
   overflow-y: hidden;
   display: flex;
   justify-content: center;
   align-items: center;
`;


const Overlay = styled.div`
   display: flex;
   justify-content: center;
   flex-direction: column;
   width: 40%;
   background-color: #313131;
   -webkit-box-shadow: 0px 0px 13px 1px rgba(0,0,0,1);
   -moz-box-shadow: 0px 0px 13px 1px rgba(0,0,0,1);
   box-shadow: 0px 0px 13px 1px rgba(0,0,0,1);

   @media (max-width: 450px) {
    width: 80%;
}
       
`;


const CrossWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   background-color: black;
   padding: 10px;
   `;


const Title = styled.div`
    height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 0.8rem;
`;


const Message = styled.div`
    height: 120px;
    color: gray;
    padding-left: 10px;
    margin-top: 10px;
    font-size: 0.8rem;

    @media (max-width: 450px) {
        height: 80px;
    }

`;



export class Dialog extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <OverlayWrapper
                onClick={this.props.close}
            >
                <Overlay onClick={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }>
                    <CrossWrapper>
                        <Title>
                            {this.props.title}
                        </Title>
                        <i onClick={this.props.close}  className={"fa fa-times " + style.show_hand } aria-hidden="true"></i>
                    </CrossWrapper>
                    <div>
                        <Message id='message-div'>
                            {this.props.message}
                        </Message>
                        <div id='button-div'>
                        </div>
                    </div>
                </Overlay>
            </OverlayWrapper>
        )
    }

}; 

