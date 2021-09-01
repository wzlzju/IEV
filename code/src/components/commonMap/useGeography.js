
import { useMemo, useState, useEffect, useContext, useCallback } from "react"
import { MapContext } from './MapProvider'

import { fetchGeographies, prepareFeature, isString } from "./utils"

export default function useGeography({ geography, countryName }) {
  const { path } = useContext(MapContext)
  const [output, setOutput] = useState({})

  // const getCountryTopoJson = useCallback((geos, countryName) => {
  //   const countryTopo = {type:"Topology", objects:{}, transform: geos['transform'], arcs: []}
  //   const arcs = geos['arcs']
  //   console.log(arcs)
  //   const geometries = geos['objects']['ne_110m_admin_0_countries']['geometries']
  //   for(let geographyCountry of geometries){
  //     if(geographyCountry['properties']['NAME'] == countryName){
  //       countryTopo['objects']['country'] = {}
  //       countryTopo['objects']['country']['arcs'] = []
  //       // 获取大类中的arcs
  //       let arcLen = 0;
  //       for(let arc of geographyCountry['arcs']){
  //         let countryArc = []
  //         // 对于选中城市的arcs进行赋值
  //         for(let arcIndex of arc[0]){
  //           countryArc.push(arcLen);
  //           arcLen++;
  //           // 处理arc下标为负的情况
  //           let positiveIndex = (arcIndex + arcs.length) % arcs.length
  //           countryTopo['arcs'].push(arcs[positiveIndex])
  //           // debugger
  //         }
  //         countryTopo['objects']['country']['arcs'].push([countryArc])
  //         countryTopo['objects']['country']['type'] = geographyCountry['type']
  //         countryTopo['objects']['country']['properties'] = geographyCountry['properties']
  //       }
  //     }
  //   }
  //   return countryTopo
  // }, [])
  const getCountryGeoJson = useCallback((geos, countryName) => {
    const countriesList = geos.features;
    for(let country of countriesList){
      if(country["properties"]["ADMIN"] === countryName){
        return country
      }
    }
    return null
  }, [])
  useEffect(() => {
    if (typeof window === `undefined`) return
    console.log(geography)
    if (!geography) return
    if (isString(geography)) {
      fetchGeographies(geography).then(geos => {
        if (geos) {
          setOutput({
            geography: getCountryGeoJson(geos, countryName),
            // mesh: getMesh(geos),
          })
        }
      })
    } else {
      setOutput({
        geography: geography,
        // mesh: getMesh(geography),
      })
    }
  }, [geography, countryName, getCountryGeoJson])

  const { geographyCountry } = useMemo(() => {
      console.log(output.geography)
    return {
      geographyCountry: prepareFeature(output.geography, path),
    }
  }, [output, path])
  return { geographyCountry }
}
