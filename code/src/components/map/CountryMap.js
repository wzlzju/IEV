import { count } from "d3";
import React, { useMemo, useEffect } from "react";
import ComposableMap from './ComposableMap'
import Geography from './Geography'
import GeographyGroup from "./GeographyGroup";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountryMap = ({countryName}) => {
    console.log("OPPS")
    useEffect(() => {
        console.log("Country")
      }, [])
    return (
        <div>
        <ComposableMap>
            <GeographyGroup geography={geoUrl} countryName={countryName}>
                {
                    ({geography}) => {
                        console.log(geography)
                        return <Geography key={countryName/*geography.rsmKey*/} geography={geography} />
                    }
                        
                    
                }
            </GeographyGroup>          
        </ComposableMap>
        </div>
    );
};

export default CountryMap;
