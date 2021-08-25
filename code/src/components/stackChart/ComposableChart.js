import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Axis from './Axis'
import useScale from './useScale'
import * as d3 from 'd3'
import { years } from '../../data/areaData'
import Paths from './Paths'
import useTooltip from './useToolTip'
import Tooltip from './Tooltip'
const ComposableChart = ({
    width,
    height,
    margin = {top: 10, left: 50, right: 10, bottom: 50},
    data,
    keys,
    offset = d3.stackOffsetNone,
    order = d3.stackOrderNone
}) => {
    const svgRef = useRef()
    const [stackAccessor, ] = useState({
        label: stack => stack.key,
        values: stack => stack.map(d => d.data),
        x: d => d.date,
        y0: d => d[0],
        y: d => d[1]
    })
    const [tooltipOption, setTooltipOption] = useState({top:-35, left:0});
    const [innerHeight, ] = useState(
        height - margin.top - margin.bottom
    )
    const [innerWidth, ] = useState(
        width - margin.left - margin.right
    )
    const stackPrepare = useCallback((data)=>{
        const stack = d3.stack()
                        .keys(keys)
                        .offset(offset)
                        .order(order);
        return stack(data)
    },[])
    const stackData = useMemo(() => (stackPrepare(data)), [data])
    const [xScale, yScale] = useScale({data:stackData, stackAccessor, innerWidth, innerHeight})
    const area = useMemo(() => (
        d3.area()
          .x((d, i) => xScale(years[i]))
          .y0(d => yScale(d[0]))
          .y1(d => yScale(d[1]))
          .curve(d3.curveBasis)
    ))
    const colorScale = useMemo(() => (
        d3.scaleOrdinal()
          .range(d3.schemeCategory10)
    ))
    const tooltipHtml = useCallback((y, x, label) => {
        return label + " Year: " + x.getFullYear() + " Expsum: " + y;
    }, []) 
    const [onMouseEnter, onMouseLeave] = useTooltip({tooltipHtml, stackAccessor, svgRef, margin, xScale, yScale, setTooltipOption, tooltipOption})
    // const tooltipOption2 = useEffect(()=>(tooltipOption), [tooltipOption])
    console.log(tooltipOption, onMouseEnter)
    console.log(yScale.range(), yScale.domain())
    return (
        <div>
            <svg
                width={width}
                height={height}
                ref={svgRef}
            >
                <g
                transform={`translate(${margin.left}, ${margin.top})`}>
                    <Axis 
                        className="x axis"
                        orientation={'bottom'}
                        scale={xScale}
                        height={innerHeight}
                        width={innerWidth}
                        margin={margin}
                        tickFormat={(tick)=>tick.getFullYear()}
                    />
                    <Axis 
                        className="y axis"
                        orientation={'left'}
                        scale={yScale}
                        height={innerHeight}
                        width={innerWidth}
                        margin={margin}
                        tickFormat={(x)=>x}
                    />
                    <Paths
                        data={stackData}
                        stackAccessor={stackAccessor}
                        area={area}
                        colorScale={colorScale}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                </g>
            </svg>
            <Tooltip
                {...tooltipOption}
            />
        </div>
    )
}

export default ComposableChart