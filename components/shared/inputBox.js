import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    height: 47px;
    border: solid 1px #707070;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    color: #000000;
    border-radius: 10px;
    background-color: transparent;
    width:100%;
    padding-left: 10px;
    min-width: ${props => props.minWidth || '200'}px;
    outline: none;
    box-sizing:border-box;
    padding-left: 22px;
    font-size: 12px;

    &:disabled{
        background: #121212;
    }


    @media screen and (max-width: 767px){
        width: 100%;
        margin-bottom: 5px;
    }
    
    &::-webkit-input-placeholder{
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 2.5;
        letter-spacing: normal;
        text-align: left;
        color: #7c7c7c;
        font-family: Asap,sans-serif;

        @media screen and (max-width: 767px){
            line-height: 1;
            font-size: 14px;
        }
    
    }

`;


class InputBox extends Component {
    render() {
        return (
            <div>
                <Input {...this.props}/>
            </div>
        );
    }
}

export default InputBox;