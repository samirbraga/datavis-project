import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import InpeForm from '../../images/inpe-form.jpg';
import "./style.scss";


const Collection1Section = props => {
    const [reached, setReached] = useState(false);

    useEffect(() => {
        props.onSeeMe(() => {
            setReached(true);
        });
    }, []);

    return (
        <div
            className="section-wrapper-2 collection-section-wrapper"
            ref={props.innerRef}
        >
            <Container fluid
                tag='section'
                className="collection-section section-sticky-top"
            >
                <Row className="align-items-center">
                    <Col
                        md={6}
                        className="collection-img h-100 p-0"
                    >
                        <div
                            className="h-100 w-100"
                            style={{
                                backgroundImage: `url(${InpeForm})`
                            }}
                        />
                    </Col>
                    <Col md={5}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <p className="pl-4">
                                Os dados foram coletados do site <a href="http://queimadas.dgi.inpe.br/queimadas/bdqueimadas/">inpe.br</a>, o qual disponibiliza focos de queimadas coletados por satélite em vários países do mundo. Como o portal nos deixa exportar os dados de no máximo 360 dias, foram exportados os dados de 1999 a 2019, <strong>ano a ano</strong>. 
                            </p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Collection1Section);