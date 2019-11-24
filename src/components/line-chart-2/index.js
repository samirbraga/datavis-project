import React, { useState, useEffect } from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import crossfilter from 'crossfilter2';
import "./style.scss";

const LineChart2 = props => {
    let node;
    const { worker, year } = props;
    const [dataset, setDataset] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (dataset.length > 0) {
            node.innerHTML = '';
            const facts = crossfilter(dataset);
            const dataDim = facts.dimension(d => d.ano);
            const numberByYearGroup = dataDim.group().reduceSum(d => d.queimada);
    
            let lineChart = dc.lineChart(node)
            let xScale = d3.scaleOrdinal()
                  .domain(dataDim)
            
            lineChart.width(800)
                    .height(400)
                    .dimension(dataDim)
                    .margins({top: 30, right: 50, bottom: 25, left: 40})
                    .renderArea(false)
                    .x(xScale)
                    .xUnits(dc.units.ordinal)
                    .renderHorizontalGridLines(true)
                    .legend(dc.legend().x(100).y(10).itemHeight(13).gap(5))
                    .brushOn(false)
                    .group(numberByYearGroup, 'quantidade de focos')
                    .ordinalColors(["#f24813"]);
            dc.renderAll();
            setLoaded(true);
        }
    }, [dataset]);

    const fecthDataset = year => {
        setLoaded(false);
        d3.csv(`${process.env.PUBLIC_URL}/datasets/quemadas_x_ano.csv`).then(data => {
            setDataset(data);
        });
    };

    useEffect(() => {
        fecthDataset();
    }, []);

    return (
        <div className="chart-container">
            <div 
                className="p-4"
                style={{
                    opacity: loaded ? 1 : 0.5
                }}
            >
                <div className="d-flex justify-content-center align-items-center" ref={n => node = n} />
            </div>
        </div>
    )
};

export default LineChart2;