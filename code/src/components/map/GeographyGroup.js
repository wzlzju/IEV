
import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"

import { MapContext } from "./MapProvider"
import useGeography from "./useGeography"

const GeographyGroup = ({
  geography,
  countryName,
  children,
  parseGeographies,
  className = "",
  ...restProps
}) => {
  const { path, projection } = useContext(MapContext)
  const { geographyCountry } = useGeography({ geography, countryName})
  console.log(geographyCountry, children)
  return (
    <g className={`rsm-geographies ${className}`} {...restProps}>
      {
        geographyCountry && geographyCountry.svgPath && children({ geography:geographyCountry })
      }
    </g>
  )
}

GeographyGroup.propTypes = {
  geography: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  children: PropTypes.func,
  parseGeographies: PropTypes.func,
  className: PropTypes.string,
}

export default GeographyGroup
