import React, { useState, useEffect } from 'react';

const withScrolly = Component => props => {
    if (!props.scrolly) {
        throw new Error("'scrolly' props must be passed to wrapped componenet.");
    }

    const { scrolly } = props;
    const componentRef = React.createRef();

    const [scroll, updateScroll] = useState(scrolly);

    const listeners = {
        onInsideMe: undefined,
        onEnterMe: undefined,
        onLeaveMe: undefined,
        onSeeMe: undefined,
        onBeforeMe: undefined,
        onAfterMe: undefined,
        onSeeingMe: undefined
    };

    const events = {};

    for (let event in listeners) {
        events[event] = callback => {
            listeners[event] = callback;
            return events;
        };
    }
    
    useEffect(() => {
        if (!componentRef.current) {
            throw new Error("'ref={props.innerRef}' must be passed to any child component.");
        }

        const element = componentRef.current;
        const topBoundary = window.pageYOffset + element.getBoundingClientRect().top;
        const bottomBoundary = topBoundary + element.offsetHeight;
        const boundary = [topBoundary, bottomBoundary];

        listeners.onInsideMe &&
            scrolly.pure.onInside(boundary, scroll => {
                let relativeScroll = (scroll - topBoundary) / element.offsetHeight;
                relativeScroll = relativeScroll < 0 ? 0 : relativeScroll;
                relativeScroll = relativeScroll > 1 ? 1 : relativeScroll;
          
                listeners.onInsideMe(relativeScroll, scroll);
            });

        listeners.onEnterMe &&
            scrolly.pure.onEnter(boundary, listeners.onEnterMe);

        listeners.onSeeMe &&
            scrolly.pure.onEnter([
                topBoundary - scrolly.getWrapperHeight() / 2,
                bottomBoundary - scrolly.getWrapperHeight() / 2
            ], listeners.onSeeMe);

        listeners.onLeaveMe &&
            scrolly.pure.onLeave(boundary, listeners.onLeaveMe);

        listeners.onBeforeMe &&
            scrolly.pure.onBefore(boundary, listeners.onBeforeMe);

        listeners.onAfterMe &&
            scrolly.pure.onAfter(boundary, listeners.onAfterMe);

        listeners.onSeeingMe &&
            scrolly.pure.onInside([
                topBoundary - scrolly.getWrapperHeight() / 2,
                bottomBoundary - scrolly.getWrapperHeight() / 2
            ], scroll => {
                let _topBoundary = topBoundary - scrolly.getWrapperHeight() / 2;
                let relativeScroll = (scroll - _topBoundary) / element.offsetHeight;
                relativeScroll = relativeScroll < 0 ? 0 : relativeScroll;
                relativeScroll = relativeScroll > 1 ? 1 : relativeScroll;
                listeners.onSeeingMe(relativeScroll, scroll);            
            });
    }, []);

    scrolly.onScroll(updateScroll);
    
    return <Component {...props}
        innerRef={componentRef}
        scroll={scroll}
        {...events}
    />
};

export default withScrolly;