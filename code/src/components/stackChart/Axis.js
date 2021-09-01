import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const { array, func, oneOf, number, string } = PropTypes;

const Axis = ({
    width = 400,
    height = 400,
    orientation,
    tickFormat = null,
    tickDirection = 'horizontal',
    innerTickSize = 6,
    tickPadding = 3,
    outerTickSize = 6,
    className = 'axis',
    zero = 0,
    label = '',
    scale
}) => {
    console.log(width)
    const _getTranslateString = () => {
        if (orientation === 'top') {
            return `translate(0, ${zero})`;
        } else if (orientation === 'bottom') {
            return `translate(0, ${zero === 0 ? height : zero})`;
        } else if (orientation === 'left') {
            return `translate(${zero}, 0)`;
        } else if (orientation === 'right') {
            return `translate(${zero === 0 ? width : zero}, 0)`;
        } else {
            return '';
        }
    }

    
    const ticks = scale.ticks()
    
    //     if (!tickFormat) {
    //         if (scale.tickFormat) {
    //             tickFormat = scale.tickFormat.apply(scale, tickArguments);
    //         } else {
    //             tickFormat = x => x;
    //         }
    //     }

        // TODO: is there a cleaner way? removes the 0 tick if axes are crossing
        // if (zero != height && zero != width && zero != 0) {
        //     ticks = ticks.filter(element => element != 0);
        // }

    const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

    const sign = orientation === 'top' || orientation === 'left' ? -1 : 1;

    const range = scale.range();

    let transform,
        x,
        y,
        x2,
        y2,
        dy,
        textAnchor,
        d,
        labelElement,
        tickRotation = 0;
        if (orientation === 'bottom' || orientation === 'top') {
            transform = 'translate({}, 0)';
            x = 0;
            y = sign * tickSpacing;
            x2 = 0;
            y2 = sign * innerTickSize;
            dy = sign < 0 ? '0em' : '.71em';
            textAnchor = 'middle';
            d = `M${range[0]}, ${sign * outerTickSize}V0H${range[1]}V${sign *
                outerTickSize}`;

            labelElement =
                <text
                    className={`${className} label`}
                    textAnchor={'end'}
                    x={width}
                    y={-6}
                >
                    {label}
                </text>
            ;
        } else {
            transform = 'translate(0, {})';
            x = sign * tickSpacing;
            y = 0;
            x2 = sign * innerTickSize;
            y2 = 0;
            dy = '.32em';
            textAnchor = sign < 0 ? 'end' : 'start';
            d = `M${sign * outerTickSize}, ${range[0]}H0V${range[1]}H${sign *
                outerTickSize}`;
            if (tickDirection === 'vertical') {
                tickRotation = -90;
                x -= sign * tickSpacing;
                y = -(tickSpacing + innerTickSize);
                textAnchor = 'middle';
            } else if (tickDirection === 'diagonal') {
                tickRotation = -60;
                x -= sign * tickSpacing;
                y = -(tickSpacing + innerTickSize);
                textAnchor = 'middle';
            }

            labelElement =
                <text
                    className={`${className} label`}
                    textAnchor="end"
                    y={6}
                    dy={orientation === 'left' ? '.75em' : '-1.25em'}
                    transform="rotate(-90)"
                >
                    {label}
                </text>
            ;
        }

        const tickElements = useMemo(() => {
            return ticks.map((tick, index) => {
                const position = scale(tick);
                
                const translate = transform.replace('{}', position);
                return (
                    <g
                        key={`${tick}.${index}`}
                        className="tick"
                        transform={translate}
                    >
                        <line x2={x2} y2={y2} stroke="#aaa" />
                        <text
                            x={x}
                            y={y}
                            dy={dy}
                            textAnchor={textAnchor}
                            transform={`rotate(${tickRotation})`}
                        >
                            {/* {tickFormat(tick)} */}
                            {tickFormat(tick)}
                        </text>
                    </g>
                );
                })  
        }, [scale, dy, textAnchor, tickFormat, tickRotation, ticks, transform, x, x2, y, y2]);

        const pathElement = useMemo(() => (<path className="domain" d={d} fill="none" stroke="#aaa" />), [d])

        return (
            <g
                className={className}
                transform={_getTranslateString()}
                style={{ shapeRendering: 'crispEdges' }}
            >
                {tickElements}
                {pathElement}
                {labelElement}
            </g>
        )
}

Axis.propTypes = {
    tickArguments: array,
    tickValues: array,
    tickFormat: func,
    tickDirection: oneOf(['horizontal', 'vertical', 'diagonal']),
    innerTickSize: number,
    tickPadding: number,
    outerTickSize: number,
    scale: func,
    className: string,
    zero: number,
    orientation: oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    label: string
}

export default Axis;
