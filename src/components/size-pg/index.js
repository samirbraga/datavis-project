import React from 'react';
import "./style.scss";

const SizePG = props => {
    const { value, max } = props;
    const pg = value / max;

    return (
        <div
            className="pg-wrapper fire-bg"
        >
            <div 
                style={{
                    width: `${pg * 100}%`
                }}
                className="pg-size pg-bar"
            >
                <span className="pg-size-value">{value.toFixed(2)}Gb</span>
                {
                    pg >= 0.25 &&
                    <span>&nbsp;de dados</span>
                }
            </div>
            <div
                style={{
                    width: `${(1 - pg) * 100}%`
                }}
                className="pg-remain pg-bar"
            >
                {(((value - max) / max) * 100).toFixed(1)}%
                    {
                        pg < 0.7 &&
                        <span>&nbsp;de redução</span>
                    }
            </div>
        </div>
    );
};

export default SizePG;