import React, { useEffect, useState } from 'react';
import { withScrolly } from '../../react-scrolly';
import Svg from './svg';
import "./style.scss";

const SvgIntro = props => {
    return (
        <div
            className="section-wrapper-3 bioma-section-wrapper"
        >
            <section
                className="bioma-section section-sticky-top"
            >
                <div style={{ width: '50%' }}>
                    <Svg />
                </div>
            </section>
        </div>
    );
};

export default SvgIntro;