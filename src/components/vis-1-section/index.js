import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import LineChart from '../line-chart';

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
                    <Col
                        md={6}
                    >
                        <LineChart worker={worker} year={1999} />
                    </Col>
                    <Col md={5}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="mb-3">Queimadas por mês</h3>
                            <p>
                                Atualmente, a maior incidência de queimadas no Brasil ocorre no período compreendido entre agosto e novembro com um máximo em setembro Este máximo sazonal está diretamente associado com o período seco que antecede a estação chuvosa e de plantio.
                            </p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Vis1Section);