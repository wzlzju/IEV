import { number } from 'prop-types'
import { useCallback, useRef } from 'react'
import * as d3 from 'd3'

// 
const useScale = ({
    data,
    stackAccessor,
    innerWidth,
    innerHeight,
}) => {
    
    const initRef = useRef()
    const xScale = useRef()
    const yScale = useRef()
    const makeTimeXScale = useCallback((x, values) => {
        const minDate = d3.min(values(data[0]), x);
        const maxDate = d3.max(values(data[0]), x);

        const scale = d3
            .scaleTime()
            .domain([minDate, maxDate])
            .range([0, innerWidth]);
            
        xScale.current = scale
    }, [stackAccessor, innerWidth, data]) 

    const makeLinearYScale = useCallback((y, y0, values) => {
        let extents = [
            d3.min(data, l => d3.min(l, d => d[0])),
            d3.max(data, l => d3.max(l, d => d[1]))
        ]

        extents = [d3.min([0, extents[0]]), extents[1]];

        const scale = d3
            .scaleLinear()
            .domain(extents)
            .range([innerHeight, 0]);

        yScale.current = scale
    }, [stackAccessor, innerHeight, data])

    // if(!initRef.current){
    //     data = stackData(data)
    //     const { x, y, y0, values, label} = stackAccessor
    //     let xIntercept, yIntercept
    //     if (!xScale) {
    //         makeTimeXScale(x, values);
    //     } else {
    //         [xScale, xIntercept] = [xScale, xIntercept];
    //     }

    //     if (!yScale) {
    //         makeLinearYScale(y, y0, values);
    //     } else {
    //         [yScale, yIntercept] = [yScale, yIntercept];
    //     }
    //     initRef.current = true
    // }
    if(!initRef.current){
        const { x, y, y0, values} = stackAccessor

        makeTimeXScale(x, values)
        makeLinearYScale(y, y0, values);
        
        initRef.current = true
    }

    return [xScale.current, yScale.current]
}

useScale.propTypes = {
    barPadding: number
}

export default useScale