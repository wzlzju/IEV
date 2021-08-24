import { useCallback, useMemo, useState } from 'react'
import Axis from './Axis'
import useScale from './useScale'
import * as d3 from 'd3'
const ComposableChart = ({
    width,
    height,
    margin = {top: 10, left: 30, right: 30, bottom: 10},
    data,
    keys,
    offset = d3.stackOffsetNone,
    order = d3.stackOrderNone
}) => {
    const [stackAccessor, ] = useState({
        label: stack => stack.key,
        values: stack => stack.map(d => d.data),
        x: d => d.date,
        y0: d => d[0],
        y: d => d[1]
    })
    const [innerHeight, ] = useState(
        height - margin.top - margin.bottom
    )
    const [innerWidth, ] = useState(
        width - margin.left - margin.right
    )
    const stackData = useCallback((data)=>{
        const stack = d3.stack()
                        .keys(keys)
                        .offset(offset)
                        .order(order);
        return stack(data)
    },[])
    
    const [xScale, yScale] = useScale({stackData, data, stackAccessor, innerWidth, innerHeight})
    console.log(yScale.range(), yScale.domain())
    return (
    <svg
        width={width}
        height={height}
    >
        <Axis 
            className="x axis"
            orientation={'bottom'}
            scale={xScale}
            height={innerHeight}
            width={innerWidth}
            tickFormat={(tick)=>tick.getFullYear()}
        />
        <Axis 
            className="y axis"
            orientation={'left'}
            scale={yScale}
            height={innerHeight}
            width={innerWidth}
            tickFormat={(x)=>x}
        />
    </svg>)
}

export default ComposableChart