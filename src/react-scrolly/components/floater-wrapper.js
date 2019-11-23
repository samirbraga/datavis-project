import React from 'react';

const FloaterWrapper = props => {
    const { scrolly } = props;
    let { placement } = props;

    if (placement === 'center') {
        placement = {
            x: 'center',
            y: 'center'
        };
    }

    if (!scrolly) {
        throw new Error("The 'scrolly' prop is required.");
    }

    return (
        <div {...props}
            className={props.className + ` scrolly-floater-wrapper`}
        />
    );
};

export default FloaterWrapper;