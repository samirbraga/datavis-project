import React, { useEffect, useState } from 'react';
import { Animated } from "react-animated-css";
import { Container } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import "./style.scss";

const TitleSection = props => {
    const progress = props.progress || 0;
    const [reached, setReached] = useState(false);
    
    useEffect(() => {
        props.onSeeMe(() => {
            setReached(true);
        });
    }, []);

    return (
        <div className="section-wrapper-half fire-bg" ref={props.innerRef}>
            <Container fluid
                tag='section'
                className="title-section section-sticky-top d-flex justify-content-center align-items-center"
            >  
                <Animated className="fast" animationIn="fadeIn" isVisible={reached}>
                    <div
                        style={{ width: `${progress}%` }}
                        className="title-progress-bar text-center d-flex justify-content-end align-items-end pb-3 pr-3"
                    >
                        <div>
                            <span>PROGRESSO</span>
                            <span className='title-progress-bar-value'>{progress || 0}%</span>
                        </div>
                    </div>
                </Animated>
                <h2>
                    {props.title}
                </h2>
            </Container>
        </div>
    )
};

export default withScrolly(TitleSection);