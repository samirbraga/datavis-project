import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col } from 'reactstrap';
import dataInfo from '../../data/datasets-info.json';
import { withScrolly } from '../../react-scrolly';
import "./style.scss";


let mediumSize = 0;

for (let i = 1999; i <= 2019; i++) {
  mediumSize += dataInfo[i.toString()].size_i_kb * 0.85;
}

mediumSize /= 1024;

const Treatment1Section = props => {
    const [reached, setReached] = useState(false);
    const [reachedAfter, setReachedAfter] = useState(false);
    const columns = dataInfo.columns_i;

    useEffect(() => {
        props.onSeeMe(() => {
            setReached(true);
            setTimeout(() => setReachedAfter(true), 500)
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
                <Row className="align-items-center text-center">
                    <Col md={{ offset: 1, size: 10 }}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <h3 className="mb-3">Remoção de colunas indesejadas</h3>
                            <p>
                                Como não iríamos utilizar essas colunas, decidimos removê-las.
                            </p>
                        </Animated>
                        <table className="collection-table table mt-4">
                            <thead>
                                <tr>
                                    {columns.map((column, i) => (
                                        <Animated
                                            className="d-table-cell align-bottom faster"
                                            animationIn="fadeIn"
                                            animationOut="fadeOut"
                                            isVisible={!reachedAfter || !column.willBeRemoved}
                                            key={column.name}
                                        >
                                            <th
                                                className="d-block w-100 text-center"
                                            >
                                                {column.name}
                                            </th>
                                        </Animated>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array(10).fill(1).map((_, k) => (
                                    <tr key={k}>
                                        {columns.map((column, i) => (
                                            <Animated
                                                className="d-table-cell align-bottom faster"
                                                animationIn="fadeIn"
                                                animationOut="fadeOut"
                                                key={column.name} 
                                                isVisible={!reachedAfter || !column.willBeRemoved}
                                            >
                                                <td 
                                                    style={{
                                                        opacity: (10 - k) / 10
                                                    }}
                                                    className="d-block w-100 text-center"
                                                />
                                            </Animated>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default withScrolly(Treatment1Section);