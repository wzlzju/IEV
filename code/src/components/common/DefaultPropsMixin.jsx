import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { createRef } from 'react';

const { oneOfType, object, array, shape, func, number } = PropTypes;

// Chart level props
const DefaultPropsMixin = {
    propTypes: {
        data: oneOfType([object, array]).isRequired,
        height: number.isRequired,
        width: number.isRequired,
        margin: shape({
            top: number,
            bottom: number,
            left: number,
            right: number
        }),
        xScale: func,
        yScale: func,
        colorScale: func,
        svgRef: object
    },

    getDefaultProps() {
        return {
            data: {
                label: 'No data available',
                values: [{ x: 'No data available', y: 1 }]
            },
            margin: { top: 0, bottom: 0, left: 0, right: 0 },
            xScale: null,
            yScale: null,
            svgRef: createRef(),
            colorScale: d3.scaleOrdinal().range(d3.schemeCategory10)//d3.scale.category20()
        };
    }
};

export default DefaultPropsMixin;
