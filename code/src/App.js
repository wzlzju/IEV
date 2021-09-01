import './App.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { flagsList, industryList } from './config/fileList'
import InteractiveForceGraph from './components/force/InteractiveForceGraph';
import ForceGraphNode from './components/force/ForceGraphNode'
import ForceGraphLink from './components/force/ForceGraphLink'
import { data } from './data/graphData'
import {areaData, keys} from './data/areaData'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
import { continentArray } from './config/simulation';
// import PieChart from './components/pieChart/PieChart';
// import { pieData } from './data/pieData';
import MapChart from './components/map/MapChart';
import CountryMap from './components/map/CountryMap';
import ComposableChart from './components/stackChart/ComposableChart';
import PixelMap from './components/pixelMap/PixelMap';
import pixelMapData from './data/pixelMapData';
import FlowMap from './components/flowMap/FlowMap';
import getSvgsSize from './config/svgSize'
import { useEffect, useRef, useState } from 'react';

function App() {
  const industryDir = "./assets/images/industry/"
  const flagsDir = "./assets/images/national-flags/"
  const scale = scaleOrdinal().domain(continentArray).range(schemeCategory10);

  var tooltipPie = function(x, y) {
    return x + ": " + y.toString();
  };
  const [svgs, setSvgs] = useState();
  useEffect(() => {
    setSvgs(getSvgsSize())
  }, [])

  return (
    <div className="board">
      <div className="row">
        <div className="col-3 config-area">config area</div>
        <div className="content col-17">
          <div className="DrawPlot">
            <div className="title">
              <h1>Industrial Economics Visualization</h1>
            </div>
            <div className="icon-display">
              <div className="row">
                <div className="flags-display col-12">
                  <ul>
                    {flagsList.map((item, index) => (
                      <li key={index} className="flags-icon">
                        <img src={require(`${flagsDir}${item}-flag-small.png`).default} alt={`${flagsDir}${item}.png`}/>
                        <p className="country-name">{item}</p>
                      </li>
                      //<img className="industry-icon" src={require(`./assets/images/industry/icon1.png`).default} alt={`${industryDir}${item}.png`}/>
                    ))}
                  </ul>
                </div>
                <div className="col-12">
                  <div className="industry-display">
                  {industryList.map((item, index) => (
                    <div key={index} className="industry-icon">
                      <img src={require(`${industryDir}${item}.png`).default} alt={`${industryDir}${item}.png`}/>
                    </div>
                    //<img className="industry-icon" src={require(`./assets/images/industry/icon1.png`).default} alt={`${industryDir}${item}.png`}/>
                  ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-display">
              <div className="row">
                <div className="col-16 main-chart">
                  <div className="flow-map" width="100%" height="400">
                    {svgs && <FlowMap />}
                  </div>
                  <div className="donut-map">
                    <div className="row">
                      <div className="col-7 country-col">
                        <div className="country-map">
                        {svgs && <CountryMap countryName="Russia" />}
                        </div>
                      </div>
                      <div className="col-10"> 
                      <div className="world-map-donut">
                      {svgs && 
                        // (<PieChart
                        //   data={pieData}
                        //   width={400}
                        //   height={400}
                        //   margin={{top: 10, bottom: 10, left: 10, right: 10}}
                        //   // tooltipOffset={{top: 175, left: 200}}
                        //   tooltipHtml={tooltipPie}
                        //   // tooltipMode={'fixed'}
                        //   sort={null}
                        // /> &&
                        <MapChart />
                      }
                      </div>
                      </div>
                      <div className="col-7 country-col">
                        <div className="country-map">
                        {svgs && <CountryMap countryName="China" />}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* <svg height="24vh" width="100%"></svg> */}
                  <div className="pixel-map">
                    {svgs && <PixelMap
                      width={1000}
                      height={100}
                      data={pixelMapData}
                    />}
                  </div>
                </div>
                <div className="col-8 right-chart">
                  {/* <ForceGraph height="12vh" width="100%" /> */}
                  <div className="force-graph">
                    {svgs && <InteractiveForceGraph
                      highlightDependencies
                      simulationOptions={{ animate: true }}
                      zoom
                    >
                      {data.nodes.map(node => (
                        <ForceGraphNode
                          key={node.id}
                          fill={scale(node.continent)}
                          node={{ ...node, radius: 5 }}
                        />
                      ))}
                      {data.links.map(link => (
                        <ForceGraphLink
                          key={`${link.source.id}=>${link.target.id}`}
                          link={{ target: link.target.id, source: link.source.id, value: link.value }}
                        />
                      ))}
                    </InteractiveForceGraph>}
                  </div>
                  <div className="area-chart">
                    {svgs && <ComposableChart 
                      data={areaData}
                      keys = {keys}
                      width = {400}
                      height = {400}
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 excel-area">excel</div>
      </div>
    </div>
  );
}

export default App;
