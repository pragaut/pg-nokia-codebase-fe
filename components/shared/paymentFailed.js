import React, { Component } from 'react'
import styled from 'styled-components';
import PopUp from './PopUp';
import { Button } from '../formStyle';
import Gap from '../comman/Gap';
import config from '../../config';

const Wapper = styled.div`
    width: 791px;
    height: 436px;
    border-radius: 39px;
    box-shadow: 0 3px 6px 0 0.6;
    background-color: #1a1a1a;
    margin: auto;
    .div{
        max-width: 425px;
        margin: auto;
        text-align: center;
        padding: 10px 0px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        box-sizing: border-box;
    }
    h1{
        font-size: 40px;
        font-weight: bold;
        color: #a78b44;
        line-height: 1.5;
    }
    p{
        font-size: 19px;
        font-weight: normal;
        line-height: 1.5;
        color: #ffffff;
    }
    img{
        max-width: 133px;
    }
`;


class paymentFailed extends Component {
    render() {
        return (
            // <PopUp>
            <Wapper>
                <div className="div">
                    <img src={config.s3bucket_coaching_static_images + 'payment-failed.png'} />
                    <Gap h='32px' />
                    <h1>Payment failed!</h1>
                    <p>Please retry or use some other payment method.</p>
                    <Gap h='32px' />
                    <Button color="#a78b44" bgColor="transparent" border="1px solid #a78b44" width="370px">UPDATE PAYMENT METHOD</Button>
                </div>
            </Wapper>
            // </PopUp>
        )
    }
}


export default paymentFailed