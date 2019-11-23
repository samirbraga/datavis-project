import React, { useEffect, useState, useRef, useCallback } from 'react';

const ScrollyWrapper = props => {
    const { scrolly } = props;
    const Component = props.component || 'div';
    const wrapperRef = useRef(null);
    let wrapperNode = null;
    
    if (props.useBodyAsWrapper) {
        wrapperNode = document.documentElement;
    }

    const getScrollPercent = scrollTop => {
        return scrollTop / (wrapperNode.scrollHeight - wrapperNode.clientHeight);
    };

    const handleScroll = () => {
        const { scrollTop } = wrapperNode;
        scrolly.setScroll(getScrollPercent(scrollTop));
        scrolly.setPureScroll(scrollTop);
    };

    useEffect(() => {
        wrapperNode = wrapperNode === null ? wrapperRef.current : wrapperNode;
        
        handleScroll();

        if (props.useBodyAsWrapper) {
            document.addEventListener('scroll', handleScroll);
        } else {
            wrapperNode.addEventListener('scroll', handleScroll);
        }

        props.getScrolly && props.getScrolly(scrolly);

    }, []);

    const childProps = { ...props };

    delete childProps.component;
    delete childProps.getScrolly;
    delete childProps.rangeFunction;
    delete childProps.scrolly;
    delete childProps.useBodyAsWrapper;
    delete childProps.onlyInsideMe;

    return (
        <Component
            {...childProps}
            ref={wrapperRef}
        />
    );
}

export default ScrollyWrapper;