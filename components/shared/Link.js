import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'next/link';



class Link extends React.Component {

    isExternal = (url) => /^(http|https):\/\//.test(url);

    render() {
        return (
            this.isExternal(this.props.to) ?
                <a
                    href={this.props.to}
                    {...this.props}
                >
                    {this.props.children}
                </a>
                :
                <RouterLink {...this.props}>
                    {this.props.children ? this.props.children : ''}
                </RouterLink>
        );
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element,
    ]),
};

export default Link;
