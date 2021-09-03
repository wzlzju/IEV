import React, { SVGAttributes } from 'react';

export interface IForceNodeProps {
  r: number;
  cx: number;
  cy: number;
  className: string;
  attributes?: SVGAttributes<SVGCircleElement>;
};

const ForceNode: React.FC<IForceNodeProps> = (props) => {
  const { r, attributes = {}, cx, cy, className } = props;
  return (
    <circle className={className} r={r} cx={cx} cy={cy} {...attributes}></circle>
  );
};

export default ForceNode;