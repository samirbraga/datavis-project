import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container, Row, Col, UncontrolledTooltip  } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import dataInfo from '../../data/datasets-info.json';
import "./style.scss";


const Collection2Section = props => {
    const [reached, setReached] = useState(false);
    const [step, setStep] = useState(1);
    const columns = dataInfo.columns_i;

    useEffect(() => {
        props.onSeeingMe(relativeScroll => {
            setStep(Math.floor(relativeScroll * 2 * columns.length));
        });
        props.onLeaveMe(() => {
            setStep(columns.length - 1);
        });
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
                    <Col md={{ size: 10, offset: 1 }}>
                        <Animated animationIn="fadeIn" isVisible={reached}>
                            <p className="pr-4 mb-5 text-center">
                                Essas foram as informações inicialmente disponíveis nos datasets exportados. <br/>
                                <span className="h6">
                                    (Passe o mouse ou toque sobre o nome da coluna para conhecê-la)
                                </span>
                            </p>
                        </Animated>
                        <table className="collection-table table mt-4">
                            <thead>
                                <tr>
                                    {columns.map((column, i) => (
                                        <React.Fragment key={column.name}>
                                            <Animated
                                                className="d-table-cell align-bottom faster"
                                                animationIn="fadeIn"
                                                animationOut="fadeOut"
                                                isVisible={step >= i}
                                                
                                            >
                                                <th
                                                    id={`collection-column-${column.name}`}
                                                    className="d-block w-100 text-center"
                                                >
                                                    {column.name}
                                                </th>
                                            </Animated>
                                            <UncontrolledTooltip
                                                autohide={false}
                                                placement="bottom"
                                                target={`collection-column-${column.name}`}
                                            >
                                                {column.description}
                                            </UncontrolledTooltip >
                                        </React.Fragment>
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
                                                isVisible={step >= i}
                                                key={column.name} 
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

export default withScrolly(Collection2Section);