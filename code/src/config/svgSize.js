import $ from 'jquery'
// console.log(d3.select(".country-map"))
// const countryMapSize = {width: d3.select(".country-map")[0]["clientWidth"], height: d3.select(".country-map")[0]["clientHeight"]}
const getSvgsSize = () => {
    const countryMapSize = {
        width: $(".country-map")[0]["clientWidth"],
        height: $(".country-map")[0]["clientHeight"]
    }

    const worldMapDonutSize = {
        width: $(".world-map-donut")[0]["clientWidth"],
        height: $(".world-map-donut")[0]["clientHeight"]
    }

    // const worldMapSize = {
    //     width: $(".world-map")[0]["clientWidth"],
    //     height: $(".world-map")[0]["clientHeight"]
    // }

    const flowMapSize = {
        width: $(".flow-map")[0]["clientWidth"],
        height: $(".flow-map")[0]["clientHeight"]
    }

    const pixelMapSize = {
        width: $(".pixel-map")[0]["clientWidth"],
        height: $(".pixel-map")[0]["clientHeight"]
    }

    const forceGraphSize = {
        width: $(".force-graph")[0]["clientWidth"],
        height: $(".force-graph")[0]["clientHeight"]
    }

    const areaGraphSize = {
        width: $(".area-chart")[0]["clientWidth"],
        height: $(".area-chart")[0]["clientHeight"]
    }
    return { countryMapSize, worldMapDonutSize, flowMapSize, pixelMapSize, forceGraphSize, areaGraphSize }
}

export default getSvgsSize