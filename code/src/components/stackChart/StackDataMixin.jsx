import PropTypes from 'prop-types';
import * as d3 from 'd3';

const { array, func } = PropTypes;
// Use d3.stack preprocessing stack data into drawing format
const StackDataMixin = {
    propTypes: {
        offset: func,
        order: func
    },

    getDefaultProps() {
        return {
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

        const stack = d3
            .stack()
            .keys(keys)
            .offset(offset)
            .order(order);
            
        this._data = stack(this._data);
        
    }
};

export default StackDataMixin;
