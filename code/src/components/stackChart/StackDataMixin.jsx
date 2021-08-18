import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { keys } from '../../data/areaData';

const { string } = PropTypes;

const StackDataMixin = {
    propTypes: {
        offset: string
    },

    getDefaultProps() {
        return {
            keys: keys,
            offset: d3.stackOffsetNone,
            order: d3.stackOrderNone
        };
    },

    componentWillMount() {
        this._stackData(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this._stackData(nextProps);
    },

    _stackData(props) {
        const { keys, offset, order, colorScale } = props;
        colorScale.domain(keys)
        const stack = d3
            .stack()
            .keys(keys)
            .offset(offset)
            .order(order);
        console.log(this._data)
        this._data = stack(this._data);
        console.log(this._data)
        // data pre process
        // for (let m = 0; m < values(this._data[0]).length; m++) {
        //     let positiveBase = 0;
        //     let negativeBase = 0;
        //     for (let n = 0; n < this._data.length; n++) {
        //         const value = y(values(this._data[n])[m]);
        //         if (value < 0) {
        //             values(this._data[n])[m].y0 = negativeBase;
        //             negativeBase += value;
        //         } else {
        //             values(this._data[n])[m].y0 = positiveBase;
        //             positiveBase += value;
        //         }
        //     }
        // }
    }
};

export default StackDataMixin;
