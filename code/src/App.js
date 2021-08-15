import './App.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { flagsList, industryList } from './config/fileList'

function App() {
  const industryDir = "./assets/images/industry/"
  const flagsDir = "./assets/images/national-flags/"
  return (
    <div>
      <Row>
        <Col span={4}>config area</Col>
        <Col className="content" span={16}>
          <div className="DrawPlot">
            <div className="title">
              <h1>Industrial Economics Visualization</h1>
            </div>
            <div className="icon-display">
              <Row>
                <Col className="flags-display" span={12}>
                  <Row className="flags-display">
                    {flagsList.map((item, index) => (
                      <div className="flags-icon">
                        <img src={require(`${flagsDir}${item}-flag-small.png`).default} alt={`${flagsDir}${item}.png`}/>{item}
                      </div>
                      //<img className="industry-icon" src={require(`./assets/images/industry/icon1.png`).default} alt={`${industryDir}${item}.png`}/>
                    ))}
                    </Row>
                </Col>
                <Col span={12}>
                  <Row className="industry-display">
                  {industryList.map((item, index) => (
                    <div className="industry-icon">
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
                <Col span={14}>
                  <svg height="36vh" width="100%"></svg>
                  <svg height="24vh" width="100%"></svg>
                  <svg height="12vh" width="100%"></svg>
                </Col>
                <Col span={10}>
                  <svg height="36vh" width="100%"></svg>
                  <svg height="36vh" width="100%"></svg>
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
