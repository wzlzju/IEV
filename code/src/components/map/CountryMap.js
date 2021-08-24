import React, { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import geo from "../../data/output.json"

const CountryMap = ({countryName}) => {
    console.log(geo)
    return (
        <div>
        <ComposableMap>
            <Geographies geography={geo}>
                {   
                    ({ geographies }) =>
                        geographies.map(geo => {
                            return countryName === geo.properties.NAME?<Geography key={geo.rsmKey} geography={geo} />:null;
                        }  
                    )   
                }
            </Geographies>
        </ComposableMap>
        </div>
    );
};

export default CountryMap;
