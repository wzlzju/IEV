var svg = d3.select("svg"),
    width = +svg.node().getBoundingClientRect().width,
    height = +svg.node().getBoundingClientRect().height;

// svg objects
var link, node, alphaText;
// the data - an object with nodes and links
var graph, wholeData;

// load the data
// d3.json("miserables.json", function(error, _graph) {
//   if (error) throw error;
//   graph = _graph;
//   initializeDisplay();
//   initializeSimulation();
// });

// load test data
d3.json("../cepii data/tmp/textile/countries-trades/57-63_countries-trades_HS92_total_V202102.json", function(error, data) {
    if(error) throw error;
    console.log(data)
    wholeData = data
    //gData = {"node":[], "link":[]}
    let year = forceProperties.year
    graph = initializeData(year, data)
    console.log("graph", graph)
    initializeDisplay();
    initializeSimulation();
})


/**
 * 读入年份，处理出该年份的力导向图绘制数据
 */
function initializeData(year, data) {
    const gData = {"nodes":[], "links":[]}
    let curData = data[year]
    const nodes = Object.keys(curData).map((v,i) => ({id: v,
        name: curData[v].country_name_full,
        alpha3: curData[v].iso_3digit_alpha,
        continent: curData[v].continent,
        expsum: curData[v].expsum}));
    const links = Object.keys(curData).reduce((total, v, i) => {
            if(curData[v].implist.length>0) total.push({target: nodes[i],
                source: nodes[Object.keys(curData).indexOf(curData[v].implist[0][0])],
                value: curData[v].implist[0][1]})
            return total
         }, []);
    // var ulinks = Object.keys(curData).map(function(v,i){ if(curData[v].implist.length>0) return {target: i,
    //     source: Object.keys(curData).indexOf(curData[v].implist[0][0]),
    //     value: curData[v].implist[0][1]}; });
    //     console.log('ulinks', ulinks)
    // const links = ulinks.filter(res=>{return res});
    gData.nodes = nodes;
    gData.links = links;
    console.log(nodes)
    return gData
}

//////////// FORCE SIMULATION //////////// 

// force simulator
var simulation = d3.forceSimulation();

// set up the simulation and event to update locations after each tick
function initializeSimulation() {
  simulation.nodes(graph.nodes);
  initializeForces();
  simulation.on("tick", ticked);
}

// values for all forces
forceProperties = {
    center: {
        x: 0.5,
        y: 0.5
    },
    charge: {
        enabled: true,
        strength: -20,
        distanceMin: 1,
        distanceMax: 2000
    },
    collide: {
        enabled: true,
        strength: .7,
        iterations: 1,
        radius: 5
    },
    forceX: {
        enabled: false,
        strength: .1,
        x: .5
    },
    forceY: {
        enabled: false,
        strength: .1,
        y: .5
    },
    link: {
        enabled: true,
        distance: 30,
        iterations: 1
    },
    year: 1995
}

// add forces to the simulation
function initializeForces() {
    // add forces and associate each with a name
    simulation
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("collide", d3.forceCollide())
        .force("center", d3.forceCenter())
        .force("forceX", d3.forceX())
        .force("forceY", d3.forceY());
    // apply properties to each of the forces
    updateForces();
}

// apply new force properties
function updateForces() {
    // get each force by name and update the properties
    simulation.force("center")
        .x(width * forceProperties.center.x)
        .y(height * forceProperties.center.y);
    simulation.force("charge")
        .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
        .distanceMin(forceProperties.charge.distanceMin)
        .distanceMax(forceProperties.charge.distanceMax);
    simulation.force("collide")
        .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
        .radius(forceProperties.collide.radius)
        .iterations(forceProperties.collide.iterations);
    simulation.force("forceX")
        .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
        .x(width * forceProperties.forceX.x);
    simulation.force("forceY")
        .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
        .y(height * forceProperties.forceY.y);
    simulation.force("link")
        .id(function(d) {return d.name;})
        .distance(forceProperties.link.distance)
        .iterations(forceProperties.link.iterations)
        .links(forceProperties.link.enabled ? graph.links : []);

    // updates ignored until this is run
    // restarts the simulation (important if simulation has already slowed down)
    simulation.alpha(1).restart();
}



//////////// DISPLAY ////////////

// generate the svg objects and force simulation
function initializeDisplay() {
  // set the data and properties of link lines
  link = svg.append("g")
        .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line");

  link.append("title")
      .text(d => `${d.source.name} to ${d.target.name}: ${d.value}`)

  // set the data and properties of node circles
  node = svg.append("g")
        .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
  
  node.on("click", d => {console.log(d)})

  // node tooltip
  node.append("title")
      .text(function(d) { return d.name; });
      console.log(graph.nodes)
  alphaText = svg.append("g")
      .attr("class", "text")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
      .filter(d => +d.expsum > 2000000)
      .attr('dx', 0)
      .attr('dy', -2)
      .text(d => d.alpha3 )
  // visualize the graph
  updateDisplay();
}

// update the display based on the forces (but not positions)
function updateDisplay() {
    let rScale = d3.scaleLinear()
                    .domain(d3.extent(graph.nodes.map(v => v.expsum)))
                    .range([1,20])
    node
        .attr("r", d => rScale(d.expsum)/*forceProperties.collide.radius*/)
        .attr("stroke", forceProperties.charge.strength > 0 ? "blue" : "red")
        .attr("stroke-width", forceProperties.charge.enabled==false ? 0 : Math.abs(forceProperties.charge.strength)/15);

    link
        .attr("stroke-width", forceProperties.link.enabled ? 1 : .5)
        .attr("opacity", forceProperties.link.enabled ? 1 : 0);
}

// update the display positions after each simulation tick
function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    alphaText
        .attr("x", d => d.x)
        .attr("y", d => d.y)
    d3.select('#alpha_value').style('flex-basis', (simulation.alpha()*100) + '%');
}



//////////// UI EVENTS ////////////

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0.0001);
  d.fx = null;
  d.fy = null;
}

// update size-related forces
d3.select(window).on("resize", function(){
    width = +svg.node().getBoundingClientRect().width;
    height = +svg.node().getBoundingClientRect().height;
    updateForces();
});

// convenience function to update everything (run after UI input)
function updateAll() {
    updateForces();
    updateDisplay();
}

function updateYear() {
    console.log("restart")
    graph = initializeData(forceProperties.year, wholeData)
    let rScale = d3.scaleLinear()
                    .domain(d3.extent(graph.nodes.map(v => v.expsum)))
                    .range([1,20])
    node = node.data(graph.nodes)
    node.exit().remove()
    node = node.enter().append("circle").attr("r", d => rScale(d.expsum)/*forceProperties.collide.radius*/)
    .attr("stroke", forceProperties.charge.strength > 0 ? "blue" : "red")
    .attr("stroke-width", forceProperties.charge.enabled==false ? 0 : Math.abs(forceProperties.charge.strength)/15)
    .merge(node)
    
    alphaText.remove()
    alphaText = alphaText.data(graph.nodes)
    console.log(alphaText)
    //alphaText.exit().remove()
    alphaText = alphaText.enter().append("text").filter(d => +d.expsum > 2000000).attr('dx',0).attr('dy',-2).text(d => d.alpha3).merge(alphaText)

    link = link.data(graph.links)
    link.exit().remove()
    link = link.enter().append("line").merge(link)

    simulation.nodes(graph.nodes)
    simulation.force('link').links(graph.links)
    simulation.alpha(1).restart()
    
}