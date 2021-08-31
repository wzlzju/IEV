import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import Axis from './Axis'
import useScale from './useScale'
import * as d3 from 'd3'
import PixelRect from './PixelRect'
// import { years } from '../../data/areaData'
// import Paths from './Paths'
// import useTooltip from './useToolTip'
// import Tooltip from './Tooltip'
const PixelMap = ({
    width,
    height,
    margin = {top: 10, left: 50, right: 10, bottom: 50},
    data,
    keys,
}) => {
    const svgRef = useRef()
    const [dataAccessor, ] = useState({
        label: stack => stack.key,
        values: d => d,
        x: d => Object.keys(d),
        y: d => d[1]
    })
    const [tooltipOption, setTooltipOption] = useState({top:-35, left:0});
    const [innerHeight, ] = useState(
        height - margin.top - margin.bottom
    )
    const [innerWidth, ] = useState(
        width - margin.left - margin.right
    )
    const extents = [
        0,
        d3.max(dataAccessor.x(data), l => d3.max(dataAccessor.x(data[l]), d => data[l][d]))
    ]
    const [xScale, yScale] = useScale({data, dataAccessor, innerWidth, innerHeight})
    const colorScale = useMemo(() => (
        d3.scaleOrdinal()
          .range(d3.schemeCategory10)
          .domain(extents)
    ))
    // const tooltipHtml = useCallback((y, x, label) => {
    //     return label + " Year: " + x.getFullYear() + " Expsum: " + y;
    // }, []) 
    // const [onMouseEnter, onMouseLeave] = useTooltip({tooltipHtml, stackAccessor, svgRef, margin, xScale, yScale, setTooltipOption, tooltipOption})

    return (
        <div>
            <svg
                width={width}
                height={height}
                ref={svgRef}
            >
                <g
                transform={`translate(${margin.left}, ${margin.top})`}>
                    {/* <Axis 
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
                    /> */}
                    <PixelRect
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        colorScale={colorScale}
                        // onMouseEnter={onMouseEnter}
                        // onMouseLeave={onMouseLeave}
                    />
                </g>
            </svg>
            {/* <Tooltip
                {...tooltipOption}
            /> */}
        </div>
    )
}

export default PixelMap