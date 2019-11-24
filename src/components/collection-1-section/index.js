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
                                Os dados foram obtidos através do site do <a href="http://queimadas.dgi.inpe.br/queimadas/bdqueimadas/">Instituto Nacional de Pesquisas Espaciais (INPE)</a>, o qual disponibiliza os focos de queimadas detectados por satélite em vários países da América Latina. O portal permite coletar os dados de no máximo 366 dias por vez, por esse motivo, os dados foram extraídos ano a ano <strong>de 1999 a 2019</strong>.
                            </p>
                        </Animated>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Collection1Section);