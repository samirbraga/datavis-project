import React, { useState, useEffect } from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import crossfilter from 'crossfilter2';

const BarChart = props => {
    let node;
    const { dataset } = props;
    const facts = crossfilter(dataset);

    useEffect(() => {
        let lineChart = dc.lineChart(node.querySelector("#chart"))
        let xScale = d3.scaleTime()
                        .domain([dataDim.bottom(1)[0].datahora, dataDim.top(1)[0].datahora])
        
        lineChart.width(800)
                .height(400)
                .dimension(dataDim)
                .margins({top: 30, right: 50, bottom: 25, left: 40})
                .renderArea(false)
                .x(xScale)
                .xUnits(d3.timeYears)
                .renderHorizontalGridLines(true)
                .legend(dc.legend().x(680).y(10).itemHeight(13).gap(5))
                .brushOn(false)
                .group(numberByYearGroup, 'Numero de queimadas')
        dc.renderAll()
    }, []);
    return (
        <div ref={n => node = n} ></div>
    )
};

export default BarChart;