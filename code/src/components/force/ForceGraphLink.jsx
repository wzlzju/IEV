import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ForceGraphLink extends PureComponent {

  render() {
    const { link, strokeWidth, className, edgeOffset, ...spreadable } = this.props;

    if (typeof edgeOffset === 'number') {
      const { x1, x2, y1, y2 } = spreadable;
      const xLen = x1 + x2;
      const yLen = y1 + y2;
      const length = Math.sqrt(Math.pow(xLen, 2) + Math.pow(yLen, 2));
      const offsetFactor = edgeOffset / length;
      const xOffset = offsetFactor * xLen;
      const yOffset = offsetFactor * yLen;

      if (x1 > x2) {
        spreadable.x1 -= xOffset;
        spreadable.x2 += xOffset;
      } else if (x1 < x2) {
        spreadable.x1 += xOffset;
        spreadable.x2 -= xOffset;
      }

      if (y1 > y2) {
        spreadable.y1 -= yOffset;
        spreadable.y2 += yOffset;
      } else if (y1 < y2) {
        spreadable.y1 += yOffset;
        spreadable.y2 -= yOffset;
      }
    }

    return (
      <line
        className={`force-link ${className}`}
        // strokeWidth={strokeWidth || Math.sqrt(link.value)}
        strokeWidth={strokeWidth || 1}
        {...spreadable}
      />
    );
  }
}

const linkPropTypes = PropTypes.shape({
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    value: PropTypes.number,
});

ForceGraphLink.propTypes = {
    link: linkPropTypes.isRequired,
    edgeOffset: PropTypes.number,
    strokeWidth: PropTypes.number,
    className: PropTypes.string,
};

ForceGraphLink.defaultProps = {
    className: '',
    opacity: 0.6,
    stroke: '#999',
    edgeOffset: 0,
};