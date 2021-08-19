import PropTypes from 'prop-types';

const { func } = PropTypes;
// init stack's data accessor
const StackAccessorMixin = {
    propTypes: {
        label: func,
        values: func,
        x: func,
        y0: func,
        y: func
    },

    getDefaultProps() {
        return {
            label: stack => stack.key,
            values: stack => stack.map(d => d.data),
            x: d => d.date,
            y0: d => d[0],
            y: d => d[1]
        };
    }
};

export default StackAccessorMixin;
