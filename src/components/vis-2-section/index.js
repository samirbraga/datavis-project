import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import BarChart from '../bar-chart';

import "./style.scss";

const Vis1Section = props => {
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
                    <Col md={{ offset: 1, size: 5 }}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="mb-3">Queimadas por bioma</h3>
                            <p>
                                A queima de biomassa nos ecossistemas devido à expansão da fronteira agrícola, à conversão de florestas e cerrados em pastagens, e à renovação de cultivos agrícolas, são alguns dos fatores mais importantes que causam impactos sobre o clima e a biodiversidade.
                            </p>
                        </Animated>
                    </Col>
                    <Col
                        md={6}
                    >
                        <BarChart worker={worker} year={1999} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Vis1Section);