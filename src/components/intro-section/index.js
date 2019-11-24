import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Svg from './svg';
import { withScrolly } from '../../react-scrolly';
import "./style.scss";

const IntroSection = props => {
    const [rate, setRate] = useState(1);

    useEffect(() => {
        props.onInsideMe(relativeScroll => {
            setRate(1 - relativeScroll * 4);
        });
    }, []);

    return (
        <div className="section-wrapper-2" ref={props.innerRef}>
            <Container fluid
                tag='section'
                className="intro-section section-sticky-top"
                style={{
                    opacity: rate
                }}
            >  
                <Row className="text-left h-100 align-items-center">
                    <Col md={{ size: 5, offset: 1 }}>
                        <h1
                            style={{
                                opacity: rate
                            }}
                            className="text-left"
                            >
                            VISUALIZAÇÃO DE <br/>DADOS PARA A WEB
                        </h1>
                        <hr className="my-3" />
                        <p>
                            Uma aplicação prática ao tema <strong>Queimadas no Brasil</strong>
                        </p>
                    </Col>
                    <Col md={{ size: 5 }}>
                        <Svg />
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default withScrolly(IntroSection);