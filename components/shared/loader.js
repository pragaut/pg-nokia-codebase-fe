import React, { Component } from 'react';
import config from '../../config';
import styled from 'styled-components';
const HomePageImage ='../static/Loader/';

const LoaderDiv = styled.div` 
    position:fixed;
    z-index: 112; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-color: #000000; 
`;

const Loaderimg =styled.img`
    position: fixed;
    right:0px;
    padding: 0px 0px; 
    z-index: 115;
    display:   block ;
    box-shadow: -1px 1px 10px rgba(0,0,0,0.2); 
    transition: all .2s linear;
    left: 50%;
    bottom: 0px;
    top: 50%;
    transform: translate(-50%, -50%); 
    align-items: center;
    justify-content: center;
`;

export default function Loader({ height }) {
    return (
        <div>
            <LoaderDiv />
            <Loaderimg src={HomePageImage + 'tenor.gif'} height={height ? height : '70px'}></Loaderimg> 
        </div>
      
    );
};