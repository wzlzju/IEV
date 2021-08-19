import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import * as d3 from 'd3';

import Chart from '../common/Chart';
import Axis from '../common/Axis';
import Path from '../common/Path';
import Tooltip from '../common/Tooltip';

import DefaultPropsMixin from './DefaultPropsMixin';
import HeightWidthMixin from './HeightWidthMixin';
import ArrayifyMixin from './ArrayifyMixin';
import StackAccessorMixin from './StackAccessorMixin';
import StackDataMixin from './StackDataMixin';
import DefaultScalesMixin from './DefaultScalesMixin';
import TooltipMixin from './TooltipMixin';
import { years } from '../../data/areaData';

const { array, func, string } = PropTypes;

const DataSet = createReactClass({
    propTypes: {
        data: array.isRequired,
        area: func.isRequired,
        line: func.isRequired,
        colorScale: func.isRequired,
        stroke: func.isRequired
    },

    render() {
        const {
            data,
            area,
            colorScale,
            label,
            onMouseEnter,
            onMouseLeave
        } = this.props;
        console.log(data)
        const areas = data.map((stack, index) =>
            <Path
                key={`${label(stack)}.${index}`}
                className="area"
                stroke="none"
                fill={colorScale(stack.key)}
                d={area(stack)}
                onMouseEnter={(e) => onMouseEnter(e, data, stack)}
                onMouseLeave={onMouseLeave}
                data={data}
            />
        );

        return <g>{areas}</g>;
    }
});

const AreaChart = createReactClass({
    mixins: [
        DefaultPropsMixin,
        HeightWidthMixin,
        ArrayifyMixin,
        StackAccessorMixin,
        StackDataMixin,
        DefaultScalesMixin,
        TooltipMixin
    ],

    propTypes: {
        interpolate: string,
        stroke: func
    },

    getDefaultProps() {
        return {
            interpolate: 'linear',
            stroke: d3.scaleOrdinal().range(d3.schemeCategory10)  // d3.scale.category20()
        };
    },
    // calc tooltip postion and inner text
    _tooltipHtml(d, selectArea, position) {
        const { x, y0, y, values, label, keys } = this.props;
        
        const selectCountry = selectArea.key;
        const xScale = this._xScale;
        const yScale = this._yScale;
        
        const xValueCursor = xScale.invert(position[0]);

        const xBisector = d3.bisector(e => x(e)).right;
        let xIndex = xBisector(values(d[0]), xScale.invert(position[0]));
        xIndex = xIndex == values(d[0]).length ? xIndex - 1 : xIndex;

        const xIndexRight = xIndex == values(d[0]).length ? xIndex - 1 : xIndex;
        const xValueRight = x(values(d[0])[xIndexRight]);

        const xIndexLeft = xIndex == 0 ? xIndex : xIndex - 1;
        const xValueLeft = x(values(d[0])[xIndexLeft]);

        if (
            Math.abs(xValueCursor - xValueRight) <
            Math.abs(xValueCursor - xValueLeft)
        ) {
            xIndex = xIndexRight;
        } else {
            xIndex = xIndexLeft;
        }
        
        // const yValueCursor = yScale.invert(position[1]);

        // console.log(selectArea, yValueCursor)
        // const yBisector = d3.bisector(
        //     e => y0(e) //  + y(e[xIndex])
        // ).left;
        // // 获取第一个参数的过程提取出来
        // let yIndex = yBisector(selectArea, yValueCursor);
        // yIndex = yIndex == d.length ? yIndex - 1 : yIndex;
        // console.log(yIndex)
        // const yValue = y(values(d[yIndex])[xIndex]);
        const yValue =
            y(selectArea[xIndex]) - y0(selectArea[xIndex]);
        const xValue = x(values(selectArea)[xIndex]);

        const xPos = xScale(xValue);
        const yPos = yScale(y(selectArea[xIndex]));

        return [
            this.props.tooltipHtml(
                yValue,
                xValue,
                selectCountry
            ),
            xPos,
            yPos
        ];
    },

    render() {
        const {
            height,
            width,
            margin,
            viewBox,
            preserveAspectRatio,
            colorScale,
            interpolate,
            stroke,
            values,
            label,
            x,
            y,
            y0,
            keys,
            xAxis,
            yAxis,
            yOrientation
        } = this.props;

        const data = this._data;
        const innerWidth = this._innerWidth;
        const innerHeight = this._innerHeight;
        const xScale = this._xScale;
        const yScale = this._yScale;

        const line = d3
            .line()
            .x(e => xScale(x(e)))
            .y(e => yScale(y0(e) + y(e)))
            .curve(d3.curveBasis);

        colorScale.domain(keys)

        const area = d3
            .area()
            .x((d, i) => xScale(years[i])) // 这里取值需要优化
            .y0(d => yScale(d[0]))
            .y1(d => yScale(d[1]))
            .curve(d3.curveBasis);
        

        return (
            <div>
                <Chart
                    height={height}
                    width={width}
                    margin={margin}
                    viewBox={viewBox}
                    preserveAspectRatio={preserveAspectRatio}
                >
                    <DataSet
                        data={data}
                        line={line}
                        area={area}
                        colorScale={colorScale}
                        stroke={stroke}
                        label={label}
                        values={values}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    />
                    <Axis
                        className="x axis"
                        orientation="bottom"
                        scale={xScale}
                        height={innerHeight}
                        width={innerWidth}
                        {...xAxis}
                    />
                    <Axis
                        className="y axis"
                        orientation={yOrientation ? yOrientation : 'left'}
                        scale={yScale}
                        height={innerHeight}
                        width={innerWidth}
                        {...yAxis}
                    />
                    {this.props.children}
                </Chart>
                <Tooltip {...this.state.tooltip} />
            </div>
        );
    }
});
// console.log(AreaChart())
export default AreaChart