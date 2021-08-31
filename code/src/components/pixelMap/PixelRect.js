import Path from "../common/Path";
import { array, func} from 'prop-types'
import { years } from "../../data/areaData";

const { useMemo } = require("react");

const PixelRect = ({data, colorScale, xScale, yScale/*, onMouseEnter, onMouseLeave}*/}) => {
    // const label = useMemo(() => stackAccessor.label, [stackAccessor])
    console.log(xScale(Object.keys(data)[0]))
    const rects = Object.keys(data).map((year) =>(
        Object.keys(data[year]).map((country, index) => (
            <rect
                key={`${year}-${country}`}
                className="rect"
                stroke="none"
                fill={colorScale(data[year][country])}
                x={xScale(year)}
                y={yScale(country)}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                // onMouseEnter={(e) => onMouseEnter(e, data, stack)}
                // onMouseLeave={onMouseLeave}
            />
    )))
    ).flat();
    console.log(rects)
    return <g>{rects}</g>;
};

PixelRect.propTypes = {
    data: array.isRequired,
    colorScale: func.isRequired,
    // stroke: func.isRequired
}

export default PixelRect;