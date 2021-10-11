/**
 * this will be a normal A tag with an onlick function
 */

import React, { Component } from 'react';
import styled from 'styled-components';

const SampleLink = styled.a`
    cursor: pointer;
    font-size: ${props => props.size ? props.size : '10px'};
    text-decoration: underline;

`;

export default function A ({ text, onClick, fontSize }) {
    return (
        <SampleLink size={fontSize} style={{ color: 'black' }} onClick={onClick}>{text}</SampleLink>
    );
} 