import React, { useEffect, useState } from 'react';
import { withScrolly } from '../../react-scrolly';
import "./style.scss";

const AnimatedText = props => {
    const { text } = props;
    const { seen } = props;
    const textLength = text.length;
    const maxPosition = Math.ceil(seen * textLength);

    return (
        <>
            {text.split('').map((letter, i) => (
                <span
                    key={letter + i}
                    className={`text-letter ${i < maxPosition ? 'visible' : ''}`}
                >
                    {letter}
                </span>
            ))}
        </>
    );
};

const TextSection = props => {
    const [rate, setRate] = useState(0);
    const [isFixed, setFixed] = useState(false);
    const text = 'O Brasil é conhecido internacionalmente pela Floresta Amazônica, a maior floresta tropical do mundo, porém esta é apenas uma parte do seu ecossistema que se estende em todo território nacional.';

    useEffect(() => {
        props.onSeeingMe(relativeScroll => {
            setRate(relativeScroll * 2);
        });
        props.onLeaveMe(() => {
            setRate(1);
        });
    }, []);

    return (
        <div
            className="section-wrapper-2 text-section-wrapper"
            ref={props.innerRef}
        >
            <section
                className="text-section section-sticky-top"
            >
                <h2
                    style={{
                        position: isFixed ? 'fixed' : 'relative'
                    }}
                >
                    <AnimatedText
                        seen={rate}
                        text={text}
                    />
                </h2>
            </section>
        </div>
    );
};

export default withScrolly(TextSection);