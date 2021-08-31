import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import ComposableMap from '../commonMap/ComposableMap'
import Geographies from '../commonMap/Geographies'
import Geography from '../commonMap/Geography'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/vulnerability.csv`).then((data) => {
        setData(data);
    });
  }, []);

  return (
    <ComposableMap
      projectionConfig={{
        center: [0, 12],
        // scale: 147
      }}
      className="world-map"
    >
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter(d => d.properties.REGION_UN !== "Antarctica")
              .map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["2017"]) : "#F5F4F6"}
                  />
                );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
