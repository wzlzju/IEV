import totalData from '@/data/57-63_countries-trades_HS92_total_V202102.json';
import { schemeCategory10 } from 'd3';

// TODO: 添加类型
function initializeData(year: number, data: any) {

    const gData = { "nodes": [], "links": [] } as any;

    const curData = data[year];

    const nodes = Object.keys(curData).map((v, i) => ({
        id: v,
        name: curData[v].country_name_full,
        alpha3: curData[v].iso_3digit_alpha,
        continent: curData[v].continent,
        expsum: curData[v].expsum,
    }));

    const links = Object.keys(curData).reduce((total, v, i) => {
        if (curData[v].implist.length > 0) {
            const item = {
                target: nodes[i],
                source: nodes[Object.keys(curData).indexOf(curData[v].implist[0][0])],
                value: curData[v].implist[0][1]
            };
            (item.source as any).radius = curData[v].implist[0][1];
            total.push(item);
        }
        return total;
    }, [] as {
        target: any,
        source: any,
        value: any
    }[]);

    gData.nodes = nodes;
    gData.links = links;
    
    return gData;
}

function getNodeColor(nodes: any) {
    const continents = new Set();
    for(const node of nodes) {
        continents.add(node.continent);
    }

    const filteredContinents = Array.from(continents);
    const colorMap = new Map();

    filteredContinents.forEach((continent, index) => {
        colorMap.set(continent, schemeCategory10[index % 10]);
    });

    return colorMap;
}

const processGraphData = (year: number) => initializeData(year, totalData);

export {
    getNodeColor,
    processGraphData
};