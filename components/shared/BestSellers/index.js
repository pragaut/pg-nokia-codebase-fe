import React from 'react';
import styled from 'styled-components';

const Badge = styled.span`
    background: #FF0000;
    padding: 2px 12px;
    font-size: 0.7rem;
    font-weight: normal;
    display: inline-block;
    margin-left: 2rem;
    border-radius: 2rem;

`;

export default class BestSellers extends React.Component {
    render () {
        return <Badge> <i color='white' className="fas fa-trophy"></i> &nbsp;bestsellers </Badge>;
    }
}
