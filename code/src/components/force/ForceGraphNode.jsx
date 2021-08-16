import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const nodePropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    radius: PropTypes.number,
});

export default class ForceGraphNode extends PureComponent {

  render() {
    const {
      node, className, r,
      labelStyle, labelClass, showLabel,
      ...spreadable
    } = this.props;

    const { radius = 5 } = node;

    return (
      <circle
        className={`force-node ${className}`}
        r={r || radius}
        {...spreadable}
      />
    );
  }
}

ForceGraphNode.propTypes = {
    node: nodePropTypes.isRequired,
    cx: PropTypes.number,
    cy: PropTypes.number,
    r: PropTypes.number,
    className: PropTypes.string,
    // these props only have an impact on the parent.
    labelStyle: PropTypes.object,
    labelClass: PropTypes.string,
    showLabel: PropTypes.bool,
};

ForceGraphNode.defaultProps = {
    className: '',
    fill: '#333',
    opacity: 1,
    stroke: '#FFF',
    strokeWidth: 1.5,
};