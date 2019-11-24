import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { Map, Marker, TileLayer, DivOverlay } from "react-leaflet";
import * as L from 'leaflet';
import * as d3 from 'd3';
import estados from '../../data/estados.json';

import "./style.scss";

const MapSection = props => {
    const { worker, year } = props;
    const [dataset, setDataset] = useState([]);
    const [loaded, setLoaded] = useState(false);
    let map;
    let info;
    
    useEffect(() => {
        if (map && dataset.length > 0) {
            map = map.leafletElement;
            let QueimadasByName = d3.map();
            dataset.forEach(d => QueimadasByName.set(d.estado, 0))
            dataset.forEach(d => QueimadasByName.set(d.estado, QueimadasByName.get(d.estado)+1))
            
            if (!info) {

                info = L.control();
                info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info');
                    this.update();
                    return this._div;
                }
    
                info.update = function (feat) {
                    this._div.innerHTML = '<h5>Queimadas</h5>' +  (feat ?
                            '<b>' + feat.properties.nome + '</b><br />' + QueimadasByName.get(feat.properties.nome)
                            : 'Passe o mouse sobre um bairro');
                }
                info.addTo(map);
            }
            
            let geoj;
            
            function highlightFeature(e) {
                let layer = e.target;    
                layer.setStyle({
                    weight: 2,
                    color: '#AAA',
                    dashArray: '',
                    fillOpacity: 0.7
                });
    
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
    
                info.update(layer.feature);
            }
            const vermelhos = d3.schemeReds[7];
        
            let legendControl = L.control({position: 'bottomright'});

            legendControl.onAdd = function (map) {

                let div = L.DomUtil.create('div', 'info legend'),
                    labels = [],
                    n = vermelhos.length,
                    from, to;

                div.innerHTML = labels.join('<br>')
                return div
            }

            legendControl.addTo(map)
    
            let colorScale = d3.interpolateReds;
    
            
            function style(feature) {
                return {
                    weight: 1,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.6,
                    fillColor: colorScale(QueimadasByName.get(feature.properties.nome)/d3.max(QueimadasByName.values()))
                };
            }
    
            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
            }
    
            function resetHighlight(e) {
                geoj.resetStyle(e.target);
                info.update();
            }
    
            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }
    
            geoj = L.geoJson(estados, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);
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
        <Container fluid
            tag='section'
            className="map-section section-sticky-top p-0"
        >
            
            <div className="p-2 position-absolute">
                <select className="p-2 d-block fire-bg mx-auto" onChange={e => fecthDataset(e.target.value)} name="" id="">
                    {Array(21).fill(1).map((_, i) => (
                        <option key={1999 + i} value={1999 + i}>
                            {1999 + i}
                        </option>
                    ))}
                </select>
            </div>
            <Map        
                className="map-container h-100 w-100"
                zoom={4.5}
                scrollWheelZoom={false}
                center={[-13.502354456476605, -55.0177915789278]}
                ref={ref => { map = ref}}
            >
                <TileLayer
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        </Container>
    );
};

export default MapSection;