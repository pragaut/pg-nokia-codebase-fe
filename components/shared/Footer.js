import React, { Component } from 'react';
import styled from 'styled-components';
import Gap from '../comman/Gap';
import Link from 'next/link';
import Wrapper from "../shared/Wrapper";
import { connect } from 'react-redux';
import * as CommonStyle from '../comman/commonStyle'

const FooterWrapper = styled.div`
    width: 100%;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    background-color: #0d3e99;
    height:40px;
    display:flex;
    justify-content:center;
    align-items : center;
    text-align:center;
    @media screen and (max-width:768px)
    {
        background-color: #0d3e99 !important;
    }
     
    
`;

const MainLinkDiv = styled.div`
width:100%; 
min-height:83px;
padding :0px 56px  0px 56px;
background-color: #3b3b3b;
display:flex;
justify-content:space-between; 
@media (max-width:900px)
{    padding :0px  45px 0px 45px; 
}
@media (max-width:768px)
{    display:flex;
    flex-direction:column;
    justify-content:space-between; 
    padding :29px 20.5px 0px 20.5px;
    background-color: #3b3b3b;
}
`;

const MainLinkUl = styled.ul` 
    height: 83px; 
    display:flex;
    align-item:center;
    justify-content:space-between;  
    li
    {
        align-items: center;
        display: flex;
        a{
            margin-right: 58.3px;
            font-family: SuisseIntl;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.71;
            letter-spacing: normal;
            text-align: left;
            color: #c3c3c3; 
        }
    }
@media (max-width:1100px)
{
    padding-top: 5px;
    li
    {
        a{
            margin-right: 30.3px; 
            font-size: 14px; 
        }
    }
}
@media (max-width:900px)
{
    padding-top: 5px;
    li
    {
        a{
            margin-right: 20.3px; 
            font-size: 13px; 
        }
    }
}
@media (max-width:800px)
{
    padding-top: 5px;
    li
    {
        a{
            margin-right: 18.3px; 
            font-size: 12px; 
        }
    }
}
@media (max-width:768px)
{
    padding-left:20.5px;
    height: auto; 
    display:flex;
    flex-direction:column;
    justify-content:space-between; 
    li{
        height:25px;
        width:100%;
        a{
            
                font-family: SuisseIntl;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.71;
                letter-spacing: normal;
                text-align: left;
                color: #333333; 
        }
    }
    li::after {
        position: absolute;
        right:30px;
        /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
        content: "";
        display: inline-block;
        /* By using an em scale, the arrows will size with the font */
        width: 0.5em;
        height: 0.5em;
        border-right: 0.1em solid black;
        border-top: 0.1em solid black;
        transform: rotate(134deg);
        margin-right: 0.5em;
        margin-top: 7px;
    }
}

`;



class FooterNew extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            helpshow: false,
            knowus: false,
            myaccount: false,
            policies: false,

        }
    }

    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key]
        })
    }
    // componentDidMount() {
    //     this.setState({ mounted: true});  
    // }

    // componentWillUpdate(){
    //     this.setState({ mounted: false});  
    // }

    render() {

        return (
            <div>
                <FooterWrapper>
                    <CommonStyle.MainDiv
                        flexdirection="row"
                        height="100%"
                        bgColor="transparent"
                    >
                        {/* <CommonStyle.TextDiv
                            width="20%"
                            minheight="100%"
                            justifycontent="center"
                            alignitems="Center"
                            color="#fff"
                            fontsize="12px"
                            afontsize="14px"
                            acolor="#fff"
                        >
                            &nbsp;
                        </CommonStyle.TextDiv> */}
                        <CommonStyle.TextDiv
                            width="100%"
                            minheight="100%"
                            justifycontent="center"
                            alignitems="Center"
                            fontWeight={"normal"}
                            color="#fff"
                            fontsize="12px"
                            afontsize="14px"
                            acolor="#fff"
                        >
                            Designed & Developed By &nbsp; <a target="_blank" href="http://pragaut.com/"> PraGaut Technologies Private Limited</a>
                            {/* <a target="_blank" href="http://pragaut.com/"><img src="../../static/pragaut_logo.png" className="pg-logo-style" /></a> */}
                        </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                </FooterWrapper>
            </div>
        )
    }
}



const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    return { width }
}

export default connect(mapStatetoProps, null)(FooterNew)