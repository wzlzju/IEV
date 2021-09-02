import React from 'react';
import PropTypes from 'prop-types';

const { number, node } = PropTypes;

const Tooltip = ({
    top = 150,
    left = 100,
    html = '',
    translate = 50,
    hidden
}) => {

    // const { top, left, hidden, html, translate } = this.props;

    const style = {
        display: hidden ? 'none' : 'block',
        position: 'fixed',
        top,
        left,
        transform: `translate(-${translate}%, 0)`,
        pointerEvents: 'none'
    };

    return (
        <div className="tooltip" style={style}>
            {html}
        </div>
    );
};

Tooltip.propTypes = {
    top: number,
    left: number,
    html: node,
    translate: number
}

export default Tooltip;
