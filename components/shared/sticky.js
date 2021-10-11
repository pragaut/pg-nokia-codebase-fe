import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    top: 5%;
    right: 50%;
    width: 100px;
    height: 50px;
    background: black;
    color: white;
    z-index: 1000;
`;

class Sticky extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSnackbar: props.showSnackbar || false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.showSnackbar === true && this.props.showSnackbar === false) {
            setTimeout( () => {
                this.setState({ showSnackbar: true });

                setTimeout(() => {
                    this.setState({ showSnackbar: false });
                }, 2000);
            }, 200);
        }
    }

    render() {

        if (this.state.showSnackbar) {
            return (
                <Wrapper>
                    {this.props.message}
                </Wrapper>
            );
        }

        return <div />
    }
}

export default Sticky;