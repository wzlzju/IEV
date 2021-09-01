import React from "react"
import PropTypes from "prop-types"

import useGeography from "../commonMap/useGeography"

const GeographyGroup = ({
  geography,
  countryName,
  children,
  parseGeographies,
  className = "",
  ...restProps
}) => {
  const { geographyCountry } = useGeography({ geography, countryName})
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
