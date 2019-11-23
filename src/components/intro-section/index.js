import React, { useEffect, useState } from 'react';
import { withScrolly } from '../../react-scrolly';
import "./style.scss";

const IntroSection = props => {
    const [rate, setRate] = useState(1);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        props.onInsideMe(relativeScroll => {
            setRate(1 - relativeScroll * 4);
        });

        props.onLeaveMe(() => {
            setRate(0);
            setTimeout(() => setHidden(true), 200);
        });
        props.onEnterMe(() => {
            setHidden(false);
        });
    }, []);

    return (
        <div className="section-wrapper-2" ref={props.innerRef}>
            <section
                className="intro-section section-sticky-top"
                hidden={hidden}
                style={{
                    opacity: rate
                }}
            >  
                <div
                    style={{
                        transform: `scale(${1 + (1 - rate)})`,
                    }}
                    className="intro-bg"
                />
                <h1
                    style={{
                        opacity: rate
                    }}
                    >
                    POLÍTICAS AMBIENTAIS
                </h1>
            </section>
        </div>
    )
};

export default withScrolly(IntroSection);