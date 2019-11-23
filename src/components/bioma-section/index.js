import React, { useEffect, useState } from 'react';
import { withScrolly } from '../../react-scrolly';
import BiomaMap from '../../../public/map';
import "./style.scss";


const BiomaSection = props => {
    const [step, setStep] = useState(1);
    const [isFixed, setFixed] = useState(false);
    const text = 'O Brasil é conhecido internacionalmente pela Floresta Amazônica, a maior floresta tropical do mundo, porém esta é apenas uma parte do seu ecossistema que se estende em todo território nacional.';

    useEffect(() => {
        props.onSeeingMe(relativeScroll => {
            setStep(Math.ceil(relativeScroll * 8));
        });
        props.onLeaveMe(() => {
            setStep(6);
        });
    }, []);

    return (
        <div
            className="section-wrapper-3 bioma-section-wrapper"
            ref={props.innerRef}
        >
            <section
                className="bioma-section section-sticky-top"
            >
                <div style={{ width: '50%' }}>
                    <BiomaMap step={step} />
                </div>
            </section>
        </div>
    );
};

export default withScrolly(BiomaSection);