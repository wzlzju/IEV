import PropTypes from 'prop-types';
import * as d3 from 'd3'

const { func, oneOf, bool, objectOf, number } = PropTypes;

const useTooltip = ({
    tooltipMode = 'mouse',
    tooltipOffset = { top: -35, left: 0 },
    tooltipHtml = null,
    tooltipContained = false,
    stackAccessor,
    svgRef,
    margin,
    xScale,
    yScale,
    setTooltipOption,
    tooltipOption
}) => {
    const _tooltipHtml = (d, selectArea, position) => {
        const { x, y0, y, values } = stackAccessor;
        
        const selectCountry = selectArea.key;
        
        const xValueCursor = xScale.invert(position[0]);

        const xBisector = d3.bisector(e => x(e)).right;
        let xIndex = xBisector(values(d[0]), xScale.invert(position[0]));
        xIndex = xIndex === values(d[0]).length ? xIndex - 1 : xIndex;

        const xIndexRight = xIndex === values(d[0]).length ? xIndex - 1 : xIndex;
        const xValueRight = x(values(d[0])[xIndexRight]);

        const xIndexLeft = xIndex === 0 ? xIndex : xIndex - 1;
        const xValueLeft = x(values(d[0])[xIndexLeft]);

        if (
            Math.abs(xValueCursor - xValueRight) <
            Math.abs(xValueCursor - xValueLeft)
        ) {
            xIndex = xIndexRight;
        } else {
            xIndex = xIndexLeft;
        }
        
        const yValue =
            y(selectArea[xIndex]) - y0(selectArea[xIndex]);
        const xValue = x(values(selectArea)[xIndex]);

        const xPos = xScale(xValue);
        const yPos = yScale(y(selectArea[xIndex]));
        const html = tooltipHtml(yValue, xValue, selectCountry)
        return [html, xPos, yPos]
    }
    const onMouseEnter = (e, data, stack) => {
        e.preventDefault();
        
        const svg = svgRef.current;
        let position;
        // calculate position of event trigger point
        if (svg.createSVGPoint) {
            let point = svg.createSVGPoint();
            point.x = e.clientX;
            point.y = e.clientY;
            point = point.matrixTransform(svg.getScreenCTM().inverse());
            position = [point.x - margin.left, point.y - margin.top];
        } else {
            const rect = svg.getBoundingClientRect();
            position = [
                e.clientX - rect.left - svg.clientLeft - margin.left,
                e.clientY - rect.top - svg.clientTop - margin.top
            ];
        }

        const [html, xPos, yPos] = _tooltipHtml(data, stack, position);

        const svgTop = svg.getBoundingClientRect().top + margin.top;
        const svgLeft = svg.getBoundingClientRect().left + margin.left;

        let top = 0;
        let left = 0;
        // switch tooltip bind mode
        if (tooltipMode === 'fixed') {
            top = svgTop + tooltipOffset.top;
            left = svgLeft + tooltipOffset.left;
        } else if (tooltipMode === 'element') {
            top = svgTop + yPos + tooltipOffset.top;
            left = svgLeft + xPos + tooltipOffset.left;
        } else {
            // mouse
            top = e.clientY + tooltipOffset.top;
            left = e.clientX + tooltipOffset.left;
        }

        function lerp(t, a, b) {
            return (1 - t) * a + t * b;
        }

        let translate = 50;

        if (tooltipContained) {
            const t = position[0] / svg.getBoundingClientRect().width;
            translate = lerp(t, 0, 100);
        }

        setTooltipOption({
            ...tooltipOption,
            top,
            left,
            hidden: false,
            html,
            translate
        });
    }

    const onMouseLeave = (e) => {
        e.preventDefault();

        setTooltipOption({
            ...tooltipOption,
            hidden: true
        });
    }

    return [onMouseEnter, onMouseLeave]
}

useTooltip.propTypes = {
    tooltipHtml: func,
    tooltipMode: oneOf(['mouse', 'element', 'fixed']),
    tooltipContained: bool,
    tooltipOffset: objectOf(number)
}

export default useTooltip;
