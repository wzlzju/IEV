import { useCallback, useMemo, useRef, useState } from 'react'
import Axis from '../CommonChart/Axis'
import useScale from '../hooks/useScale'
import * as d3 from 'd3'
import { years } from '../../data/areaData'
import Paths from '../CommonChart/Paths'
import useTooltip from '../hooks/useToolTip'
import Tooltip from '../CommonChart/Tooltip'

// enum margin {
//     top = 10,
//     bottom = 10,
//     left = 50,
//     right = 50
// }

export interface IStackChart {
    width: number,
    height: number,
    data: Array<object>,
    keys: Array<string>,
    // margin: margin
}

export interface margin {
    top: number,

}

const StackChart: React.FC<IStackChart> = (props) => {
    // margin = {top: 10, left: 50, right: 10, bottom: 50},
    
    // offset = d3.stackOffsetNone,
    // order = d3.stackOrderNone
    const { width, height, data, keys } = props
    const svgRef = useRef()
    const [stackAccessor, ] = useState({
        label: (stack:object) => stack.key,
        values: stack => stack.map(d => d.data),
        x: d => d.date,
        y0: d => d[0],
        y: d => d[1]
    })
    const [tooltipOption, setTooltipOption] = useState({top:-35, left:0});
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const stackPrepare = useCallback((data)=>{
        const stack = d3.stack()
                        .keys(keys)
                        // .offset(offset)
                        // .order(order);
        return stack(data)
    },[keys])
    const stackData = useMemo(() => (stackPrepare(data)), [data, stackPrepare])

    const [xScale, yScale] = useScale({data:stackData, stackAccessor, innerWidth, innerHeight})

    const area = useMemo(() => (
        d3.area()
          .x((d, i) => xScale(years[i]))
          .y0(d => yScale(d[0]))
          .y1(d => yScale(d[1]))
          .curve(d3.curveBasis)
    ), [xScale, yScale])

    const colorScale = useMemo(() => (
        d3.scaleOrdinal()
          .range(d3.schemeCategory10)
    ), [])

    const tooltipHtml = useCallback((y, x, label) => {
        return label + " Year: " + x.getFullYear() + " Expsum: " + y;
    }, []) 

    const [onMouseEnter, onMouseLeave] = useTooltip({tooltipHtml, stackAccessor, svgRef, margin, xScale, yScale, setTooltipOption, tooltipOption})
    // const tooltipOption2 = useEffect(()=>(tooltipOption), [tooltipOption])

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

export default StackChart