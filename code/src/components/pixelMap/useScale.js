import { number } from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

// 
const useScale = ({
    data,
    dataAccessor,
    innerWidth,
    innerHeight,
}) => {
    
    const initRef = useRef()
    const xScale = useRef()
    const yScale = useRef()
    const makeBandXScale = useCallback((x, values) => {
        const scale = d3
            .scaleBand()
            .domain(x(data))
            .range([0, innerWidth]);
            
        xScale.current = scale
    }, [dataAccessor, data]) 

    const makeBandYScale = useCallback((x, y, values) => {
        const countries = x(data[x(data)[0]])

        const scale = d3
            .scaleBand()
            .domain(countries)
            .range([innerHeight, 0]);

        yScale.current = scale
    }, [dataAccessor, data])

    // if(!initRef.current){
    //     data = stackData(data)
    //     const { x, y, y0, values, label} = dataAccessor
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
        const { x, y, values} = dataAccessor

        makeBandXScale(x, values)
        makeBandYScale(x, y, values);
        
        initRef.current = true
    }

    return [xScale.current, yScale.current]
}

useScale.propTypes = {
    barPadding: number
}

export default useScale