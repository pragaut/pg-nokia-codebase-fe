import React, { Component } from 'react';
import { Row, Column, Hr } from '../Grid';
import styled from 'styled-components';
import Gap from '../comman/Gap';
import Link from 'next/link';
import FullWidthDiv from '../fullWidthDiv';
import Wrapper from "./Wrapper";
import { connect } from 'react-redux';
import config from '../../config';


const FooterWrapper = styled.div`
    width: 100%;
    background-color: #1a1a1a;
    .chevron_icon{
        img{
            max-width:14px;
        }
    }
    .active{
        transform: rotate(181deg);
    }
    .social{
        @media screen and (max-width: 767px) {
               width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                padding: 10px 0px;
        }
        a{
            margin-right: 40px;
            &:last-child{
                margin-right: 0px;
            }
            img{
                width: 35px;
                @media screen and (max-width: 767px) {
                   width: 28px;
            }
            }
        }
    }
    .payment_icon{
        /* width: 110px; */
        img{
            width: 38px;
            margin-right: 8px;
             &:last-child{
                margin-right: 0px;
            }
           
        }
    }
    .right_reseverd{
          font-size: 14px;
        font-weight: normal;
        line-height: 1.71;
        text-align: left;
        color: #7c7c7c;
    }
    .footer_link{
        display: flex;
        align-items: center;
        justify-content: flex-start;
      @media screen and (max-width: 767px) {
          flex-direction: column;
          width: 100%;
          align-items: flex-start;
      }
    }
    .footer_link li {
        list-style: none;
        margin-right: 15px;
        @media screen and (max-width: 767px) {
            margin-right: 0px;
            display: block;
        }
        a{
            display: block;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.71;
            letter-spacing: normal;
            text-align: left;
            color: #ffffff;
             @media screen and (max-width: 767px) {
                line-height: 2.14;}
        }
    }
`;
// const UL = styled.ul`
//     margin: 0px;
//     padding: 0px;
//     h3{
//         font-size: 14px;
//         font-weight: normal;
//         text-align: left;
//         color: #fff;
//         text-transform: uppercase;
//         @media screen and (max-width:767px){
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//         }
//     }
//     li{
//         display: block;
//         a{
//         font-size: 14px;
//         font-weight: normal;
//         line-height: 1.71;
//         text-align: left;
//         color: #7c7c7c;
//         }
//     }
// `;



class Footer extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            helpshow: false,
            knowus: false,
            myaccount: false,
            policies: false

        }
    }

    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key]
        })
    }
    render() {

        const loggedIn = this.loggedUser();
	const userId = loggedIn ? loggedIn.email : -1; 

        const small = this.props.width < 768
        return (
            <div>


                <FooterWrapper>
                    {/* {!small ? <Gap h='120px' /> : <Gap h='40px' />} */}
                    {/* <Row alignItems="flex-start">
                            <Column xs="12" sm="3" margin="0px" padding={`${small ? "5px 15px" : 'auto'}`}>
                                <UL>
                                    <h3 onClick={() => this.showHandler("helpshow")}>Help {small && <span className="chevron_icon"><img className={this.state.helpshow ? "active" : "" } src={config.s3bucket_coaching_static_images + "chevron_down.png"} /></span>}</h3>
                                    <div>
                                        {!small &&
                                            <div>
                                                <li><Link href=""><a>helpdesk@thebigstack.com</a></Link></li>
                                                <li><a href='https://d1qpjs6wydep0a.cloudfront.net/bigstack.poker.survey.updated.pdf' target='_blank'>Go to Poker Survey</a></li>
                                                <li><Link href="/contact-us"><a>Contact us</a></Link></li>
                                                <li><Link href="https://pokeruniversity.thebigstack.com/blog/"><a>Blog</a></Link></li>
                                            </div>
                                        }
                                        {small && this.state.helpshow &&
                                            <div>
                                                <li><Link href=""><a>helpdesk@thebigstack.com</a></Link></li>
                                                <li><a href='https://d1qpjs6wydep0a.cloudfront.net/bigstack.poker.survey.updated.pdf' target='_blank'>Go to Poker Survey</a></li>
                                                <li><Link href="/contact-us"><a>Contact us</a></Link></li>
                                                <li><Link href="https://pokeruniversity.thebigstack.com/blog/"><a>Blog</a></Link></li>
                                            </div>
                                        }
                                    </div>
                                </UL>
                            </Column>
                            <Column xs="12" sm="3" margin="0px" padding={`${small ? "5px 15px" : 'auto'}`}>
                                <UL>
                                    <h3 onClick={() => this.showHandler("knowus")}>Know Us {small && <span className="chevron_icon"><img className={this.state.knowus ? "active" : "" } src={config.s3bucket_coaching_static_images + "chevron_down.png" } /></span>}</h3>
                                    <div>
                                        {!small &&
                                            <div>
                                                <li><Link href="/About"><a>About Us</a></Link></li>
                                            </div>
                                        }
                                        {small && this.state.knowus &&
                                            <div>
                                                <li><Link href="/About"><a>About Us</a></Link></li>
                                            </div>
                                        }
                                    </div>
                                </UL>
                            </Column >
                            {
                                loggedIn &&
                                <Column xs="12" sm="3" margin="0px" padding={`${small ? "5px 15px" : 'auto'}`}>
                                    <UL>
                                        <h3 onClick={() => this.showHandler("myaccount")}>My Account {small && <span className="chevron_icon"><img className={this.state.myaccount ? "active" : "" }src={config.s3bucket_coaching_static_images +  "chevron_down.png"} /></span>}</h3>
                                        <div>
                                            {!small &&
                                                <div>
                                                    <li><Link href="/profile"><a>My Personal Info</a></Link></li>
                                                </div>}
                                            {small && this.state.myaccount &&
                                                <div>
                                                    <li><Link href="/profile"><a>My Personal Info</a></Link></li>
                                                </div>}
                                        </div>
                                    </UL>
                                </Column>
                            }
                            <Column xs="12" sm="3" margin="0px" padding={`${small ? "5px 15px" : 'auto'}`}>
                                <UL>
                                    <h3 onClick={() => this.showHandler("policies")}>Policies {small && <span className="chevron_icon"><img className={this.state.policies ? "active" : "" } src={config.s3bucket_coaching_static_images + "chevron_down.png"} /></span>}</h3>
                                    <div>
                                        {!small &&
                                            <div><li><Link href="/privacy-policy"><a>Privacy Policy</a></Link></li>
                                            </div>
                                        }
                                        {small && this.state.policies &&
                                            <div>
                                                <li><Link href="/privacy-policy"><a>Privacy Policy</a></Link></li>
                                            </div>}
                                    </div>
                                </UL>
                            </Column>
                        </Row> */}

                    <div style={{ backgroundColor: `${small ? undefined : "#3b3b3b"}`, padding: '16px 0px' }}>
                        <FullWidthDiv>
                            <Row >
                                <div className="footer_link">
                                    <li><Link href={{pathname : '/About', query: { page: 'About'}}} as="/About"><a>About Us</a></Link></li>
                                    
                                    {loggedIn && <li><Link href="/profile"><a>My Account</a></Link></li>}

                                    <li><Link  href={{pathname : '/contact-us', query: {page: 'contact_us'}}} as="/contact-us"><a>Contact us</a></Link></li>

                                    <li><Link  href={{pathname : '/privacy-policy', query:{ page: 'privacyPolicy'}}} as="/privacy-policy"><a>Privacy Policy</a></Link></li>

                                    <li><a href='https://d1qpjs6wydep0a.cloudfront.net/bigstack.poker.survey.updated.pdf' target='_blank'>Go to Poker Survey</a></li>

                                    <li><Link href="https://pokeruniversity.thebigstack.com/blog/"><a>Blog</a></Link></li>

                                </div>
                                {small && <Gap h="15px" />}
                                <div className="social">
                                    <Link href="https://www.facebook.com/bigstackpokeruni/"><a target="_blank"><img src={config.s3bucket_coaching_static_images + "facbook.png"} /></a></Link>
                                    <Link href="https://twitter.com/bigstackpoker_u"><a target="_blank"><img src={config.s3bucket_coaching_static_images + "twitter.png"} /></a></Link>
                                    <Link href="https://www.instagram.com/bigstackpokeruni/"><a target="_blank"><img src={config.s3bucket_coaching_static_images + "instagram.png"} /></a></Link>
                                    <Link href="https://www.linkedin.com/company/bigstackpokeruni"><a target="_blank"><img src={config.s3bucket_coaching_static_images + "linkedin.png"} /></a></Link>
                                </div>
                            </Row>
                        </FullWidthDiv>
                    </div>

                    {!small ? <Gap h="20px" /> : <Gap h="0px" />}
                    {!small ?
                        <FullWidthDiv>
                            <Row justify="flex-start">
                                <div className="payment_icon" style={{ marginRight: '15px' }}>
                                    <Row>
                                        <img src={config.s3bucket_coaching_static_images + "upi.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "master.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "visa.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "paypal.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "paytm.png"} />
                                    </Row>

                                </div>
                                <p className="right_reseverd">© 2019 BigStack All Rights Reserved</p>

                            </Row>
                        </FullWidthDiv>
                        :
                        <FullWidthDiv>
                            <Row direction={`${small && "column"}`} alignItems={`${small && "center"}`} justify={`${small && "center"}`}>
                                <p className="right_reseverd" style={{ color: `${small ? "#fff" : ""}` }}>© 2019 BigStack All Rights Reserved</p>
                                <Gap h="20px" />
                                <div className="payment_icon">
                                    <Row>
                                        <img src={config.s3bucket_coaching_static_images + "upi.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "master.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "visa.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "paypal.png"} />
                                        <img src={config.s3bucket_coaching_static_images + "paytm.png"} />
                                    </Row>

                                </div>
                            </Row>
                            {/* <img src={"http://tracking.adcanopus.com/aff_l?offer_id=36356&adv_sub="+userId} width="1" height="0" /> */}
                        </FullWidthDiv>}
                    <Gap h="20px" />
                </FooterWrapper>
               {!small &&  <script src="//code.tidio.co/y0cnvrfihxokyf1yyrciqwqszkqjvyq7.js" async></script>}
             
            </div>
        )
    }
}



const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    return { width }
}

export default connect(mapStatetoProps, null)(Footer)