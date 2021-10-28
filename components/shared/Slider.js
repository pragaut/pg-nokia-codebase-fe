import BestSellers from './BestSellers';
import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head'
import config from '../../config';
// import LazyLoad from 'react-lazyload';
import style from '../../theme/app.scss';
import Gap from '../comman/Gap'


const backgrounds = ['#ffe1ff', '#0000ff', '#4d5b23', '#f6ac94', '#5fe164', '#7474c1', '#ff8080', '#9283is', '#18283u', '#9i87yt']

const Wrapper = styled.div`
 width: 100%;
    overflow: ${props => {
        if (!props.browser) {
            // default settings
            return 'hidden';
        }

        //props.visibleItems > 1 ? 'hidden' : 'scroll'
        return undefined;
    }
    };
 scroll-behavior: smooth;
 display: flex;
 flex-direction: row;
 position: relative;
`;

const WrapperFull = styled.div`
    display:flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    padding-left:${props => props.paddingleft ? props.paddingleft : "0px"};
    .red {cursor: default;color: gray;}
    .no-red {cursor: pointer;color: gray;}

    .title {
    font-size: 30px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.23;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    text-transform: uppercase;
        @media all and (max-width: 450px) {
            font-size: 24px;
            margin: auto;
        }
    }

    .carosel_button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-wrap: nowrap;
        padding-left: 27px;
            @media all and (max-width: 450px){
                padding-left: 0px;
            }
        .view_more{
            font-size: 14px;
            color: #aaaaaa;
            cursor: pointer;
                @media all and (max-width: 450px) {
                    display: none;
                }
        }
    }
`;

const Item = styled.div`
 width: 100%;
 transition: all ease-out .5s;
 overflow: ${props => {
        if (process.env.APP_NAME === 'coaching') return undefined;
        else return 'hidden';
    }};
 
`;

const LeftSliderArrow = styled.div`
    cursor: hand;
    position: absolute;
    left :${props => props.left ? props.left : '0px'}; 
    top: ${props => props.top ? props.top : '174'};
    z-index: 10;
    transform: ${props => props.top !== "0px" ? "translate(0%, -50%)" : 'translate(0%, 0%)'} ;
    /* new  */
    bottom: 0px;
    height: 100%;
    background: ${props => props.bgColor || "#00000066"};
    width: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        max-width: 21px;
    }
`;

const RightSliderArrow = styled.div`
    cursor: hand;
    position: absolute;
    top: ${props => props.top ? props.top : '174'};
    z-index: 8;
    transform:${props => props.top !== "0px" ? "translate(0%, -50%)" : 'translate(0%, 0%)'};
    right: ${props => props.right ? props.right : '-6px'}; 
    /* new  */
    bottom: 0px;
    height: 100%;
    background: ${props => props.bgColor || "#1a1a1a66"};
    width: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        max-width: 21px;
    }
`;

const ItemWrapper = styled.div`
     transition: all ease-out .5s;
    min-width: calc(100% / ${props => {
        return props.visibleItems === 1 ? 1.2 : (props.visibleItems + 0.2);
    }
    }
    );
    
    max-width: calc(100% / ${props => {
        return props.visibleItems === 1 ? 1.2 : (props.visibleItems + 0.2);
    }
    });

    // z-index: ${props => (props.headerColumnIncluded && props.index === 0) ? 4 : 0};
    //z-index: ${props => props.index};

    background-color: ${props => props.bgColor ? props.bgColor : '#ebebeb'};
    position: relative;
    transform: ${props => {
        if (props.headerColumnIncluded && props.index === 0) {
            return 'translateX(0%)';
        }

        let translate = 0;

        if (props.stateIndex === 0) {
            return `translateX(0%)`;
        }

        if (props.previousIndex === -1) {
            return 'translateX(10%)';
        }
        else if ((props.previousIndex > props.stateIndex)) {
            // back
            translate = 90 + ((props.stateIndex - 1) * 100);

            if (props.stateIndex === 0) {
                return `translateX(10%)`;
            }
        }
        else if ((props.previousIndex <= props.stateIndex)) {
            // back
            translate = 80 + ((props.stateIndex - 1) * 100);
        }
        else {
            //same :(


        }
        return 'translateX(-' + translate + '%)';
    }
    };

    &:hover{
        z-index: 8;
    }
    &:first-child{
        margin-left:${props => props.stateIndex === 0 ? (props.marginleft ? props.marginleft : "25px") : (props.marginleft ? props.marginleft : "-25px")}
    }
`;






const CarouselContainer = styled.div`
 display: flex;
 flex-wrap: nowrap;
 scroll-behavior: smooth;
 min-width: 100%;
 transition: all ease-out 2s;
 `;


const CarouselSlot = styled.div`
 transition: all ease-out .2s;
 scroll-behavior: smooth;
`;


class Slider extends Component {

    _uniqueKeyForModule = 'slider-';

    state = {
        currentIndex: 0,
        visibleItems: 4,
        nextDisable: false,
        backDisable: false,
        leftArrowImage: 'arrowleftgrey.png',
        rightArrowImage: 'arrowright.png',
        showArrows: true
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.visibleItems != this.state.visibleItems) {
            this.setState({
                currentIndex: 0,
                leftArrowImage: 'arrowleftgrey.png',
                rightArrowImage: 'arrowright.png',
                visibleItems: nextProps.visibleItems,
                showArrows: (nextProps.visibleItems < this.props.children.length) && (nextProps.visibleItems > 1)
            });
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isIndexSetzero != this.props.isIndexSetzero) {
            if (nextProps.isIndexSetzero === true) {
                this.setState({
                    currentIndex: 0
                });
            }
        }
    }

    componentDidMount() {

        this.setState({
            currentIndex: 0,
            visibleItems: this.props.visibleItems,
            leftArrowImage: 'arrowleftgrey.png',
            rightArrowImage: 'arrowright.png',
            showArrows: (this.props.visibleItems < this.props.children.length) && (this.props.visibleItems > 1)
        });
    }


    _backClicked = false;
    screenX = 0;

    getImageSourceForArrows = index => {
        let rightArrow = 'arrowright.png';
        let leftArrow = 'arrowleft.png';

        if (index === 0) {
            leftArrow = 'arrowleftgrey.png';
        }
        else if (index === (this.props.children.length - this.props.visibleItems)) {
            rightArrow = 'arrowrightgrey.png'
        }

        return {
            rightArrow,
            leftArrow
        };
    };


    next = () => {
        const currentIndex = Math.min(this.props.children.length - this.props.visibleItems, this.state.currentIndex + 3);
        const arrowPics = this.getImageSourceForArrows(currentIndex)
        this._previousIndex = this.state.currentIndex;

        this.setState({
            currentIndex,
            rightArrowImage: arrowPics.rightArrow,
            leftArrowImage: arrowPics.leftArrow
        });
        if (this.props.ModuleIndex !== null && this.props.ModuleIndex !== undefined) {
            this.setState(this.props.clickActiveIndexFromSlider(this.props.ModuleIndex, currentIndex))
        }
    };


    back = () => {
        const currentIndex = Math.max(0, this.state.currentIndex - 3);
        const arrowPics = this.getImageSourceForArrows(currentIndex)
        this._previousIndex = this.state.currentIndex;
        this.setState({
            currentIndex,
            rightArrowImage: arrowPics.rightArrow,
            leftArrowImage: arrowPics.leftArrow
        });
        if (this.props.ModuleIndex !== null && this.props.ModuleIndex !== undefined) {
            this.setState(this.props.clickActiveIndexFromSlider(this.props.ModuleIndex, currentIndex))
        }
    };


    _timesRendered = 0;
    _previousIndex = -1;

    render() {
        const { title, children, visibleItems, casualBtnhide, controllColor, gaphide, top } = this.props;

        if (process.browser) {
            this._timesRendered = this._timesRendered + 1;
        } 
        return (
            <WrapperFull paddingleft={this.props.paddingleft}>
                {!casualBtnhide &&
                    <div className="carosel_button">
                        <div style={{ color: `${this.props.titleColor ? this.props.titleColor : ''}` }} className={['title', style.flex_best].join(' ')} ><span>{this.props.title}</span>
                            {this.props.showBest &&
                                <div className={style.flex_best_content}>
                                    <BestSellers />
                                </div>
                            }
                        </div>
                        <br />
                    </div>}

                {!gaphide && <Gap h='0.3125rem' />}
                <Wrapper id='wrapper' renderedCount={this._timesRendered} browser={this.props.browser} visibleItems={this.state.visibleItems}>
                    {children && children.length > visibleItems &&
                        <LeftSliderArrow left={this.props.left} top={this.props.top} style={{ opacity: `${this.state.currentIndex === 0 ? "0" : "1"}` }} onClick={this.back} bgColor={"#1a1a1a66"}>
                            <img src={config.s3bucket_coaching_static_images + "newPrevicon.png"}></img></LeftSliderArrow>}
                    <CarouselContainer id='container' >
                        {children && children.map((child, index) => (
                            <ItemWrapper index={index} previousIndex={this._previousIndex} stateIndex={this.state.currentIndex} headerColumnIncluded={this.props.headerColumnIncluded} key={(this.props.keyName ? this.props.keyName : this._uniqueKeyForModule) + index} visibleItems={this.state.visibleItems} bgColor={this.props.bgColor} marginleft={this.props.marginleft} >
                                <CarouselSlot data={this.state.translateValue}>
                                    <Item

                                        onTouchStart={event => {
                                            // console.log("HRY 1")
                                            this.screenX = event.targetTouches[0] ? event.targetTouches[0].clientX : -1;
                                        }}


                                        onTouchEndCapture={event => {
                                            // console.log("HRY")


                                            const screenX = event.changedTouches[0] ? event.changedTouches[0].clientX : -1;
                                            const diff = Math.abs(this.screenX - screenX);

                                            if (diff > 6 && screenX > -1 && this.screenX > -1) {
                                                // ok we got the screenx

                                                if (this.screenX > screenX) {
                                                    this.next();
                                                }
                                                else {
                                                    this.back();
                                                }
                                            }
                                        }}

                                        index={index} previousIndex={this._previousIndex} headerColumnIncluded={this.props.headerColumnIncluded} stateIndex={this.state.currentIndex} id={this.props.keyName ? this.props.keyName + '' + index : 'index'}>{child}</Item>
                                </CarouselSlot>
                            </ItemWrapper>
                        ))}
                    </CarouselContainer>
                    {children && children.length > visibleItems &&
                        <RightSliderArrow right={this.props.right} top={this.props.top} bgColor={"#1a1a1a66"} className={this.state.nextDisable ? "red" : 'no-red'} onClick={this.next}><img src={config.s3bucket_coaching_static_images + "newNexticon.png"}></img></RightSliderArrow>}
                </Wrapper>

            </WrapperFull>
        );
    }
}

export default Slider;
