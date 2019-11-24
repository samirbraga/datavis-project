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
    const { text, up } = props;

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
            className={`section-wrapper-2 ${ up ? 'section-wrapper-up-1' : '' } text-section-wrapper`}
            ref={props.innerRef}
        >
            <section
                className="text-section section-sticky-top"
            >
                <p
                    style={{
                        position: 'relative'
                    }}
                >
                    <AnimatedText
                        seen={rate}
                        text={text}
                    />
                </p>
            </section>
        </div>
    );
};

export default withScrolly(TextSection);