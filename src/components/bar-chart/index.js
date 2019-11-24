import React, { useState, useEffect } from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import crossfilter from 'crossfilter2';
import "./style.scss";

const BarChart = props => {
    let node;
    const { worker, year } = props;
    const [dataset, setDataset] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (dataset.length > 0) {
            node.innerHTML = '';
            const facts = crossfilter(dataset);
            const ecosDim = facts.dimension(d => d.bioma);
            const ecosGroup = ecosDim.group();
    
            let barChart = dc.barChart(node);
            //let xScale = d3.scaleOrdinal().domain(ecosDim);
                            
            barChart.width(900)
                    .height(400)
                    .dimension(ecosDim)
                    .margins({ top: 30, right: 50, bottom: 25, left: 40 })
                    .x(d3.scaleBand())
                        .xUnits(dc.units.ordinal)
                    .renderHorizontalGridLines(true)
                    .legend(dc.legend().x(650).y(10).itemHeight(13).gap(5))
                    .brushOn(false)
                    .group(ecosGroup, 'Queimadas')
                    .ordinalColors(["#ffa500"]);
                    
            
            barChart.gap(50);
            
            barChart.render();
            setLoaded(true);
        }
    }, [dataset]);

    const fecthDataset = year => {
        setLoaded(false);
        worker.postMessage({
            csvName: `${process.env.PUBLIC_URL}/datasets/${year}_depois.csv`,
            year
        });
    };

    useEffect(() => {
        worker.addEventListener('message', e => {
            if (e.data.year) {
                setDataset(e.data.data);
            }
        });

        fecthDataset(year);
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
            <div className="p-2">
                <select className="p-2 d-block fire-bg mx-auto" onChange={e => fecthDataset(e.target.value)} name="" id="">
                    {Array(21).fill(1).map((_, i) => (
                        <option key={1999 + i} value={1999 + i}>
                            {1999 + i}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
};

export default BarChart;