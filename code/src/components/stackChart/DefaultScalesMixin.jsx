import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { years } from '../../data/areaData';

const { number } = PropTypes;

const DefaultScalesMixin = {
    propTypes: {
        barPadding: number
    },

    getDefaultProps() {
        return {
            barPadding: 0.5
        };
    },

    componentWillMount() {
        this._makeScales(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this._makeScales(nextProps);
    },

    _makeScales(props) {
        const { xScale, xIntercept, yScale, yIntercept } = props;

        if (!xScale) {
            [this._xScale, this._xIntercept] = this._makeXScale(props);
        } else {
            [this._xScale, this._xIntercept] = [xScale, xIntercept];
        }

        if (!yScale) {
            [this._yScale, this._yIntercept] = this._makeYScale(props);
        } else {
            [this._yScale, this._yIntercept] = [yScale, yIntercept];
        }
    },

    _makeXScale(props) {
        console.log(this._data)
        const data = this._data;
        console.log(years[0])
        if (typeof years[0] === 'number') {
            return this._makeLinearXScale(props);
        } else if (typeof years[0].getMonth === 'function') {
            return this._makeTimeXScale(props);
        } else {
            return this._makeBandXScale(props);
        }
    },

    _makeLinearXScale(props) {
        const { x, values } = props;
        const data = this._data;

        const extentsData = data.map(stack => values(stack).map(e => x(e)));
        const extents = d3.extent(
            Array.prototype.concat.apply([], extentsData)
        );

        const scale = d3
            .scaleLinear()
            .domain(extents)
            .range([0, this._innerWidth]);

        const zero = d3.max([0, scale.domain()[0]]);
        const xIntercept = scale(zero);

        return [scale, xIntercept];
    },

    _makeBandXScale(props) {
        const { keys, barPadding } = props;

        const scale = d3
            .scaleBand()
            .domain(keys)
            //.rangeRoundBands([0, this._innerWidth], barPadding);
            .range([0, this._innerWidth])

        return [scale, 0];
    },

    _makeTimeXScale(props) {
        const { x, values } = props;
        const minDate = d3.min(years);
        const maxDate = d3.max(years);
        console.log(this._data, minDate, maxDate)
        const scale = d3
            .scaleTime()
            .domain([minDate, maxDate])
            .range([0, this._innerWidth]);

        return [scale, 0];
    },

    _makeYScale(props) {
        const { y } = props;
        const data = this._data;
        if (typeof y(data[0][0]) === 'number') {
            return this._makeLinearYScale(props);
        } else {
            return this._makeOrdinalYScale(props);
        }
    },

    _makeLinearYScale(props) {
        const { y, y1, values, groupedBars } = props;
        const data = this._data

        let extents = [
            d3.min(data, l => d3.min(l, d => d[0])),
            d3.max(data, l => d3.max(l, d => d[1]))
        ]

        extents = [d3.min([0, extents[0]]), extents[1]];

        const scale = d3
            .scaleLinear()
            .domain(extents)
            .range([this._innerHeight, 0]);
        console.log(scale.domain(), scale.range())
        const zero = d3.max([0, scale.domain()[0]]);
        const yIntercept = scale(zero);

        return [scale, yIntercept];
    },

    _makeOrdinalYScale() {
        const scale = d3.scaleOrdinal().range([this._innerHeight, 0]);

        const yIntercept = scale(0);

        return [scale, yIntercept];
    }
};

export default DefaultScalesMixin;
