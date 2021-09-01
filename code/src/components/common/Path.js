import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const { string, array } = PropTypes;

const Path = ({
    className = 'path',
    fill = 'none',
    stroke,
    strokeWidth = '2',
    strokeLinecap = 'butt',
    strokeDasharray = 'none',
    onMouseEnter,
    onMouseLeave,
    data,
    d,
}) =>{
    return (
        <path
            className={className}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={strokeDasharray}
            fill={fill}
            d={d}
            onMouseMove={evt => onMouseEnter(evt, data)}
            onMouseLeave={evt => onMouseLeave(evt)}
        />
    );
}

Path.propTypes = {
    className: string,
    stroke: string.isRequired,
    strokeLinecap: string,
    strokeWidth: string,
    strokeDasharray: string,
    fill: string,
    d: string.isRequired,
    data: array.isRequired
}

export default Path;