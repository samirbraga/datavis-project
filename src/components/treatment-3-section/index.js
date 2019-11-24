import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import dataInfo from '../../data/datasets-info.json';
import IncendioExemplo from '../../images/exemplo-incendio.jpg';
import "./style.scss";

let finalSize = 0;

for (let i = 1999; i <= 2019; i++) {
  finalSize += dataInfo[i.toString()].size_f_kb;
}

finalSize /= 1024;

const Treatment3Section = props => {
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
            props.setCurrentSize(finalSize  );
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
                    <Col md={{ offset: 1, size: 10}}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="text-center mb-3">Remoção de queimadas com menos de 10 focos</h3>
                            <p className="text-center mb-5">
                                Os falso-positivos tratam de queimadas com poucos focos que podem se tratar apenas de incêndios em áreas urbanas. Uma queimada característica é mostrada na figura ao lado. <a href="http://queimadas.cptec.inpe.br/~rqueimadas/ExemplosValidacao/2019_exemplosvalida_INPE_Queimadas/?C=N;O=D">Aqui</a> há vários outros exemplos.
                            </p>
                        </Animated>
                        <div
                            className="treatment-img p-0"
                        >
                            <img className="d-block mx-auto" style={{ maxWidth: '1000px' }} src={IncendioExemplo} alt="Exemplo de incêndio capturado no satélite e noticiado nos veículos de comunicação" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Treatment3Section);