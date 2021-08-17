import PropTypes from 'prop-types';

const { func } = PropTypes;

const StackAccessorMixin = {
    propTypes: {
        label: func,
        values: func,
        x: func,
        y: func,
        y1: func
    },

    getDefaultProps() {
        return {
            label: stack => stack.label,
            values: stack => stack.values,
            x: d => d.data.month,
            y: d => d[0],
            y1: d => d[1]
        };
    }
};

export default StackAccessorMixin;
