import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import ChromeTabs from '../../images/chrome-tabs.gif';
import "./style.scss";

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
                        md={{ offset: 1, size: 5 }}
                    >
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="mb-3">Processamento simples em paralelo</h3>
                            <p className="mr-4">
                                Como os datasets tinham tamanhos consideráveis, foi construído um notebook para fazer todo o processamento descrito acima, e este foi executado para cada um dos conjuntos de dados, separadamente em abas do navegador Google Chrome que as divide em processos diferentes. Com isso, o próprio escalonador do Sistema Operacional pode separá-los para execução em paralelo nos núcleos do processador e otimizar o processo.
                            </p>
                        </Animated>
                    </Col>
                    <Col
                        md={6}
                        className="collection-img h-100 p-0"
                    >
                        <div
                            className="h-100 w-100"
                            style={{
                                backgroundImage: `url(${ChromeTabs})`
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Treatment2Section);