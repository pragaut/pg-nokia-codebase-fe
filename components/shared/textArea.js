import React, { Component } from 'react';
import styled from 'styled-components';

const InputWapper = styled.div`
    width:100%;
    margin: ${props => props.wapperMargin ? props.wapperMargin : "10px"};
    display: flex;
    flex-direction: column;
    position: relative;
    span{
        color: rgba(0, 0, 0, 0.54);
        padding: 0;
        font-size: 13px;
        font-family: Asap;
        font-weight: 400;
        line-height: 1;
        letter-spacing: 0.00938em;
    }
    input{
        padding:${props => props.inputPadding ? props.inputPadding : '6px 0 7px'};
        color: rgba(0, 0, 0, 0.87);
        position: relative;
        font-size: 14px;
        box-sizing: border-box;
        align-items: center;
        font-family: 'Lato', sans-serif;
        line-height: 1.1875em;
        border:0px;
        border-bottom: 1px solid #ccc;
        outline: none;
    }
    input:hover ~ .focus_border,
    input:focus ~ .focus_border {
        width: 100%;
        transition: 0.4s;
    }
    textarea{
        padding:${props => props.inputPadding ? props.inputPadding : '6px 0 7px'};
        color: rgba(0, 0, 0, 0.87);
        position: relative;
        font-size: 14px;
        box-sizing: border-box;
        align-items: center;
        font-family: Asap;
        line-height: 1.1875em;
        border:0px;
        border-bottom: 1px solid #ccc;
        outline: none;
    }
    textarea:hover ~ .focus_border,
    textarea:focus ~ .focus_border {
        width: 100%;
        transition: 0.4s;
    }
    .focus_border{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: ${props => props.focusbordercolor ? props.focusbordercolor : '#3399FF'}; ;
        transition: 0.4s;
    }
`;


class InputBox extends Component {
    render() {
        return (
            <InputWapper focusbordercolor={this.props.focusbordercolor} wapperMargin={this.props.wapperMargin} inputPadding={this.props.inputPadding}>
                <span>{this.props.label}</span>
                <textarea {...this.props} />
                <span className="focus_border"></span>
            </InputWapper>
        );
    }
}

export default InputBox;