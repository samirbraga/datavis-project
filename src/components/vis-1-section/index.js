import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import LineChart from '../line-chart';

import "./style.scss";

const Treatment2Section = props => {
    const { worker } = props;
    const [reached, setReached] = useState(false);

    useEffect(() => {
        props.onSeeMe(() => {
            setReached(true);
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
                    >
                        <LineChart worker={worker} year={2019} />
                    </Col>
                    <Col md={5}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="mb-3">Agregação de focos próximos semelhantes em queimadas</h3>
                            <p>
                                Consideramos que se há vários focos próximos, e que se eles estão dentro da mesma hora, eles podem ser agregados em uma <strong>queimada</strong>, adicionando a informação de <strong>Número de Focos</strong> como peso para não perdermos a informação agregada e além disso removendo falsos-positivos.
                            </p>
                            <p>
                                Abaixo seguem dois heatmaps como uma comparação do antes e depois deste filtro aplicado ao dataset do ano de 2003. 
                            </p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Treatment2Section);