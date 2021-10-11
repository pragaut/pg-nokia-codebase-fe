import React from 'react';
import style from '../../theme/app.scss';
import styled from 'styled-components';
import theme from '../../theme';

const TimerWapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px 0px;
    border-top: 1.5px solid ${theme.colors.mediumGrey};
    border-bottom: 1.5px solid ${theme.colors.mediumGrey};

    @media screen and (max-width: 480px){
        flex-direction: column;
        justify-content: center;
    }
    .offer_expire{
        font-size: 14px;
        font-weight: normal;
        font-style: italic;
        font-stretch: normal;
        line-height: 1.14;
        letter-spacing: normal;
        text-align: center;
        color: ${theme.colors.black};
        text-transform: uppercase;

        @media screen and (max-width: 480px){
            margin-bottom: 12px;
        }
    }
    .time_flex{
        font-size: 20px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 0.8;
        letter-spacing: normal;
        text-align: center;
        color: ${theme.colors.black};
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: uppercase;
        span{
            display: inline-block;
            margin-right: 10px;
            &:last-child{
                margin-right: 0px;
            }

        }
    }

`;

class Timer extends React.Component {

    _timer = undefined;

    constructor(props){
        super(props);

        const getRidOfTime = dt => {

            function addDays(date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }

            const date = addDays(dt, 1);

            const d = date.getDate();
            const m = date.getMonth() + 1;
            const y = date.getFullYear();

            return new Date(new Date(y + '-' + (m > 9 ? '' : '0') + m + '-' + (d > 9 ? '' : '0') + d).toLocaleString("en-US", {timeZone: "UTC"}));
        }

        this.state = {
            start: props.start ? props.start : new Date(),
            now: props.start ? props.start : new Date(),
            end: props.end ? props.end : getRidOfTime(new Date())
        };
    }

    componentDidMount() {
        this.startTimer();
    }

    processTimer = () => {
        const timeDifference = (new Date().getTime() - this.state.end.getTime());
        this.setState({
            now: new Date(this.state.end.getTime() - timeDifference)
        });
    };


    startTimer = () => {
        this._timer = setInterval(
            () => {
                this.processTimer();
            }, 1000
        );
    };


    componentWillUnmount() {
        clearInterval(this._timer);
    }


    render() {
        const { title } = this.props;

        const remainingHours = this.state.now.getHours();
        const remainingMinutes = this.state.now.getMinutes();
        const remainingSeconds = this.state.now.getSeconds();

        return (<TimerWapper>
                    <div className='offer_expire'>offer expiring in</div>
                    {/* <div className={[style.small_text, style.timer_title].join(' ')}>{title ? title : 'BUY 2 Get 1 Free'}</div> */}
                    <div className='time_flex'>
                    <span>{`${remainingHours} hrs`}</span> <span>{`${remainingMinutes} mins`}</span> <span>{`${remainingSeconds} secs`}</span>
                    </div>
            </TimerWapper>);
    }
};


export default Timer;