import React, { Component } from 'react';
import Styled from 'styled-components';

const Wapper = Styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: #eae5e5 solid;
    border-bottom-width: thin;
    margin-bottom: 13px;

    h2 {
        padding: 6px 10px;
        text-align: center;
        color:#000;
        // margin-top: -13px;
        // border-bottom: 0.5px solid #ccc;
        padding-top: 0px;
    }
`;

class ModalHeader extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Wapper>
                 <h2>{this.props.heading}</h2>     
                 {this.props.children}           
            </Wapper>
        );
    }
}

export default ModalHeader;