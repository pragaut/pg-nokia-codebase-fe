import React, { Component } from 'react';
import styled from 'styled-components';
import  * as commonTypes from '../../action-types/common.action.types';
import style from '../../theme/app.scss';

const OverlayWrapper = styled.div`
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(32, 32, 32, 0.51);
   position: fixed;
   z-index: ${props => props.showAbove ? '1000' : '999'};
   overflow-y: hidden;
   display: flex;
   justify-content: center;
   align-items: center;
`;


const Overlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    width: ${props => props.showReview ? '50%' : ''};
    
    @media screen and (max-width: 767px){
        width: ${props => props.showLarge ? '80%' : ''};
    }
`;

export default function PopUp(WrapComponent, closeHandler) {
    return class PopUp extends Component {

        state = {
            showOverlay: true,
        }

        closeOverlay = () => {
            this.setState({
                showOverlay: false
            });

            if(closeHandler) closeHandler();
        }

        UNSAFE_componentWillReceiveProps(nextProps) {
            
        }

        render() {
            
            return (
                <div>
                    {
                        this.state.showOverlay &&
                        <OverlayWrapper onClick={this.closeOverlay} showAbove={this.props.showAbove}>
                            <Overlay onClick={
                                (event) => event.stopPropagation()
                            } showLarge={this.props.showLarge} showReview={this.props.showReview}>
                                {!this.props.hideCloseButton && this.props.type !== commonTypes.LOADING_SHOW && <div><i className={"fa fa-times " + style.show_hand } onClick={this.closeOverlay} aria-hidden="true"></i></div>}
                                <div style={{ width: '100%' }}>
                                    <WrapComponent {...this.props} >
                                    </WrapComponent>
                                </div>
                            </Overlay>
                        </OverlayWrapper>
                    }

                </div>
            );
        }
    };

}