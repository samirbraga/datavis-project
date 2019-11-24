import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import LineChart2 from '../line-chart-2';

import "./style.scss";

const Vis3Section = props => {
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
                        <LineChart2 worker={worker} year={1999} />
                    </Col>
                    <Col md={5}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="mb-3">Queimadas ao longo dos anos</h3>
                            <p>
                                Assume-se que os ciclos anuais podem ser tratados como termos harmônicos através dos anos, dentro de um determinado período. O INPE noticiou um aumento alarmante nesse tipo de incidente, gerando uma comoção em todo o mundo.
                            </p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Vis3Section);