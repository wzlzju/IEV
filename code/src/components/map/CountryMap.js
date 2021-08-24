import React, { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import * as geo from "../../data/worldMapWithState.json"

const CountryMap = ({countryName}) => {
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
