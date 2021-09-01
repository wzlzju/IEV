
import React from "react"
import PropTypes from "prop-types"

import { MapProvider } from "./MapProvider"

const ComposableMap = ({
  width = 800,
  height = 600,
  projection = "geoMercator",
  projectionConfig = {},
  className = "",
  geography = "",
  ...restProps
}) => {
  return (
    <MapProvider
      width={width}
      height={height}
      projection={projection}
      projectionConfig={projectionConfig}
      geography={geography}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={`map-svg ${className}`}
        {...restProps}
      />
    </MapProvider>
  )
}

ComposableMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  projection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  projectionConfig: PropTypes.object,
  className: PropTypes.string,
}

export default ComposableMap
