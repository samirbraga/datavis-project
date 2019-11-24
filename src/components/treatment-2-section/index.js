import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import dataInfo from '../../data/datasets-info.json';
import { withScrolly } from '../../react-scrolly';
import "./style.scss";

let mediumSize = 0;

for (let i = 1999; i <= 2019; i++) {
  mediumSize += dataInfo[i.toString()].size_i_kb * 0.35;
}

mediumSize /= 1024;

const ClusterAnim = props => {
    const num = 100;
    const { rate, scale, showText } = props;
    const [offsets, _] = useState(Array(num).fill(1).map(() => ({
        x: Math.random(),
        y: Math.random()
    })));

    return (
        <div className="cluster-container">
            {Array(num).fill(1).map((_, i) => (
                <div
                    style={{
                        transform: `translate(${rate * offsets[i].x * -400}px, ${rate * offsets[i].y * -400}px) scale(${scale}, ${scale})`
                    }}
                    className="cluster-point"
                    key={`${offsets[i].x}${offsets[i].y}`}
                >
                </div>
            ))}
        </div>  
    );
};

const Treatment2Section = props => {
    const [reached, setReached] = useState(false);
    const [scale, setScale] = useState(1);
    const [rate, setRate] = useState(1);

    useEffect(() => {
        props.onSeeingMe(relativeScroll => {
            let _rate = (1 - relativeScroll * 2);
            if (_rate <= 0.01) {
                setScale(1 - _rate * 10);
            } else {
                setScale(1);
            }
            _rate = _rate < 0 ? 0 : _rate;
            _rate = _rate > 1 ? 1 : _rate;
            setRate(_rate);
        });
        props.onSeeMe(() => {
            setReached(true);
        });
        props.onEnterMe(() => {
            props.setCurrentSize(mediumSize);
        });
    }, []);


    return (
        <div
            className="section-wrapper-2 treatment-section-wrapper"
            ref={props.innerRef}
        >
            <Container fluid
                tag='section'
                className="treatment-section section-sticky-top"
            >
                <Row className="align-items-center">
                    <Col
                        md={6}
                        className="treatment-img h-100 p-0"
                    >
                        <ClusterAnim rate={rate} scale={scale} />
                    </Col>
                    <Col md={5}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="mb-3">Agregação de focos próximos semelhantes em queimadas</h3>
                            <p>
                                Consideramos que se há vários focos próximos, e que se eles estão dentro da mesma hora, eles podem ser agregados em uma <strong>queimada</strong>, adicionando a informação de <strong>Número de Focos</strong> como peso para não perdermos a informação agregada e além disso removendo falsos-positivos.
                            </p>
                            <p>
                                Abaixo seguem dois mapas de calor como uma comparação do antes e depois deste filtro aplicado ao dataset do ano de 2003.
                            </p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Treatment2Section);