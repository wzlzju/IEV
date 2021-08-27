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
import AreaChart from './components/stackChart/AreaChart';
import PieChart from './components/pieChart/PieChart';
import { pieData } from './data/pieData';
import MapChart from './components/map/MapChart';
import CountryMap from './components/map/CountryMap';
import ComposableChart from './components/stackChart/ComposableChart';


function App() {
  const industryDir = "./assets/images/industry/"
  const flagsDir = "./assets/images/national-flags/"
  const scale = scaleOrdinal().domain(continentArray).range(schemeCategory10);

  var tooltipPie = function(x, y) {
    return x + ": " + y.toString();
  };

  return (
    <div>
      <Row>
        <Col span={3}>config area</Col>
        <Col className="content" span={17}>
          <div className="DrawPlot">
            <div className="title">
              <h1>Industrial Economics Visualization</h1>
            </div>
            <div className="icon-display">
              <Row>
                <Col className="flags-display" span={12}>
                  <Row className="flags-display">
                    {flagsList.map((item, index) => (
                      <div key={index} className="flags-icon">
                        <img src={require(`${flagsDir}${item}-flag-small.png`).default} alt={`${flagsDir}${item}.png`}/>{item}
                      </div>
                      //<img className="industry-icon" src={require(`./assets/images/industry/icon1.png`).default} alt={`${industryDir}${item}.png`}/>
                    ))}
                    </Row>
                </Col>
                <Col span={12}>
                  <Row className="industry-display">
                  {industryList.map((item, index) => (
                    <div key={index} className="industry-icon">
                      <img src={require(`${industryDir}${item}.png`).default} alt={`${industryDir}${item}.png`}/>
                    </div>
                    //<img className="industry-icon" src={require(`./assets/images/industry/icon1.png`).default} alt={`${industryDir}${item}.png`}/>
                  ))}
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="chart-display">
              <Row>
                <Col span={18}>
                  <svg height="36vh" width="100%"></svg>
                  <Row>
                    <Col span={7}>
                      <CountryMap countryName="China" />
                    </Col>
                    <Col span={10}> 
                      <PieChart
                        data={pieData}
                        width={400}
                        height={400}
                        margin={{top: 10, bottom: 10, left: 10, right: 10}}
                        // tooltipOffset={{top: 175, left: 200}}
                        tooltipHtml={tooltipPie}
                        // tooltipMode={'fixed'}
                        sort={null}
                      />
                      {/* <MapChart /> */}
                    </Col>
                    <Col span={7} >
                      <CountryMap countryName="United States of America" />
                    </Col>
                  </Row>
                  {/* <svg height="24vh" width="100%"></svg> */}
                  <svg height="12vh" width="100%"></svg>
                </Col>
                <Col span={6}>
                  {/* <ForceGraph height="12vh" width="100%" /> */}
                  <InteractiveForceGraph
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
                  </InteractiveForceGraph>
                  <ComposableChart 
                    data={areaData}
                    keys = {keys}
                    width = {400}
                    height = {400}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={4}>excel</Col>
      </Row>
    </div>
  );
}

export default App;
