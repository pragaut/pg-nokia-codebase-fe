import React from 'react';
import PropTypes from 'prop-types';
import style from '../../theme/app.scss';
import styled from 'styled-components';
import theme from '../../theme';

const MainDiv = styled.div`
    position: relative;
`;

const InnerDiv = styled.div`
    position: absolute
`;

class StickyContainer extends React.Component {

    state = {
        width: 0,
        topWhereFixedShouldBeOff: 0
    };

    mainDivRef = undefined;

    constructor(props) {
        super(props);

        this.mainDivRef = React.createRef();

    }

    handleScroll() {
        const ref = this.props.HeightRef;

        if (!ref || !ref.currentRef) {
            return;
        }

        const height = ref.current.clientHeight;
        const width = this.mainDivRef.current.clientWidth;
    }

    componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		window.addEventListener('screen', this.handleScroll, { passive: true });
    }

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
		window.removeEventListener('screen', this.handleScroll)
	}

    render() {

        return <MainDiv ref={this.mainDivRef}>
                    <InnerDiv>
                        {this.props.children}
                    </InnerDiv>
                </MainDiv>
    }
}

StickyContainer.propTypes = {
    /** the components to be rendered as child */
    Children: PropTypes.arrayOf(PropTypes.element),
    /** the reference to take height from. This should be the component which will remove the fixed */
    HeightRef: PropTypes.element
}

export default StickyContainer;