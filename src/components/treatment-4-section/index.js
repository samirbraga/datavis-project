import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { withScrolly } from '../../react-scrolly';
import ImageComparison from '../image-comparison';
import Antes2003 from '../../images/antes-2003.jpg';
import Depois2003 from '../../images/depois-2003.jpg';
import "./style.scss";

const Treatment4Section = props => {
    const [rate, setRate] = useState(0);

    useEffect(() => {
        props.onSeeingMe(relativeScroll => {
            setRate(relativeScroll);
        });
    }, []);


    return (
        <section
            className="section-wrapper-2 treatment-section-wrapper"
            ref={props.innerRef}
        >
            <Container fluid
                tag='section'
                className="treatment-section section-sticky-top p-0"
            >
                <ImageComparison
                    image1={Antes2003}
                    image2={Depois2003}
                    currentCrop={rate}
                />
            </Container>
        </section>
    );
};

export default withScrolly(Treatment4Section);