import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { gdpData } from "../../data/gdpData"
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const FlowMap = () => {
  return (
    <ComposableMap
        projectionConfig={{
            center: [0, 12],
            scale: [30]
        }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies
            .filter(d => d.properties.REGION_UN !== "Antarctica")
            .map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
        }
      </Geographies>
      {gdpData.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
          {/* <text
            textAnchor="middle"
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text> */}
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default FlowMap;
