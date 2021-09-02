import React, { useMemo, useCallback } from "react";
import ComposableMap from '../CommonMap/ComposableMap'
import Geography from '../CommonMap/Geography'
import GeographyGroup from "../CommonMap/GeographyGroup";
import countries from '../../data/countries.json'

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountryMap = ({countryName}) => {
    const getCountryGeoJson = useCallback((geos, countryName) => {
        const countriesList = geos.features;
        for(let country of countriesList){
          if(country["properties"]["ADMIN"] === countryName){
            return country
          }
        }
        return null
    }, [])
    const countryJson = useMemo(() => (getCountryGeoJson(countries, countryName)), [countries, countryName])
    return (
        <ComposableMap geography={countryJson}>
            <GeographyGroup geography={countryJson} countryName={countryName}>
                {
                    ({geography}) => (<Geography key={countryName/*geography.rsmKey*/} geography={geography} />)
                }
            </GeographyGroup>          
        </ComposableMap>
    );
};

export default CountryMap;