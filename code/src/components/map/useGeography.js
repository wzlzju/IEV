
import { useMemo, useState, useEffect, useContext, useCallback } from "react"
import { MapContext } from './MapProvider'

import { fetchGeographies, getFeature, getMesh, prepareFeature, isString, prepareMesh } from "./utils"

export default function useGeography({ geography, countryName }) {
  const { path } = useContext(MapContext)
  const [output, setOutput] = useState({})

  const getCountryTopoJson = useCallback((geos, countryName) => {
    const countryTopo = {type:"Topology", objects:{}, transform: geos['transform'], arcs: []}
    const arcs = geos['arcs']
    const geometries = geos['objects']['ne_110m_admin_0_countries']['geometries']
    for(let geographyCountry of geometries){
      if(geographyCountry['properties']['NAME'] == countryName){
        countryTopo['objects']['country'] = {}
        countryTopo['objects']['country']['arcs'] = []
        // 获取大类中的arcs
        let arcLen = 0;
        for(let arc of geographyCountry['arcs']){
          let countryArc = []
          // 对于选中城市的arcs进行赋值
          for(let arcIndex of arc[0]){
            countryArc.push(arcLen);
            arcLen++;
            // 处理arc下标为负的情况
            let positiveIndex = (arcIndex + arcs.length) % arcs.length
            countryTopo['arcs'].push(arcs[positiveIndex])
            // debugger
          }
          countryTopo['objects']['country']['arcs'].push([countryArc])
          countryTopo['objects']['country']['type'] = geographyCountry['type']
          countryTopo['objects']['country']['properties'] = geographyCountry['properties']
        }
      }
    }
    return countryTopo
  }, [])
  useEffect(() => {
    if (typeof window === `undefined`) return
    if (!geography) return
    if (isString(geography)) {
      fetchGeographies(geography).then(geos => {
          console.log(getCountryTopoJson(geos, countryName))
        if (geos) {
          setOutput({
            geography: getFeature(getCountryTopoJson(geos, countryName)),
            // mesh: getMesh(geos),
          })
        }
      })
    } else {
      setOutput({
        geography: getFeature(getCountryTopoJson(geography, countryName)),
        // mesh: getMesh(geography),
      })
    }
  }, [geography])

  const { geographyCountry } = useMemo(() => {
      console.log(output.geography)
    return {
      geographyCountry: prepareFeature(output.geography, path),
    }
  }, [output, path])
  return { geographyCountry }
}
