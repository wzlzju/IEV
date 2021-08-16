import totalData from './57-63_countries-trades_HS92_total_V202102.json'

function initializeData(year, data) {
    const gData = {"nodes":[], "links":[]}
    let curData = data[year]
    const nodes = Object.keys(curData).map((v,i) => ({
        id: v,
        name: curData[v].country_name_full,
        alpha3: curData[v].iso_3digit_alpha,
        continent: curData[v].continent,
        expsum: curData[v].expsum,
        group: 1
    }));
    const links = Object.keys(curData).reduce((total, v, i) => {
        if(curData[v].implist.length>0) total.push({
            target: nodes[i],
            source: nodes[Object.keys(curData).indexOf(curData[v].implist[0][0])],
            value: curData[v].implist[0][1]
        })
        return total
    }, []);
    // var ulinks = Object.keys(curData).map(function(v,i){ if(curData[v].implist.length>0) return {target: i,
    //     source: Object.keys(curData).indexOf(curData[v].implist[0][0]),
    //     value: curData[v].implist[0][1]}; });
    //     console.log('ulinks', ulinks)
    // const links = ulinks.filter(res=>{return res});
    gData.nodes = nodes;
    gData.links = links;
    console.log(gData)
    console.log(new Set(gData.nodes.map((node) => node.continent)))
    return gData
}

export const data = initializeData(1995, totalData)