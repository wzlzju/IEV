import Path from "../common/Path";
import { array, func} from 'prop-types'

const { useMemo } = require("react");

const Paths = ({data, stackAccessor, area, colorScale, onMouseEnter, onMouseLeave}) => {
    const label = useMemo(() => stackAccessor.label, [stackAccessor])
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
};

Paths.propTypes = {
    data: array.isRequired,
    area: func.isRequired,
    colorScale: func.isRequired,
    // stroke: func.isRequired
}

export default Paths;