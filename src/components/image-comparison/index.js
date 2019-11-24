import React, { Component } from "react";
import './image-comparison.scss';

class ImageComparison extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image1: props.image1,
            image2: props.image2
        };
    }

    render() {
        return (
            <div
                className="image-comparison"
            >
                <div
                    style={{ backgroundImage: `url('${this.state.image1}')` }}
                    className="image-comparison-wrapper" id="wrapper-1"
                />
                <div
                    className={"image-comparison-crop"}
                    style={{ width: `calc(${this.props.currentCrop * 100}% + 5px)` }}
                >
                    <div
                        style={{ backgroundImage: `url('${this.state.image2}')` }}
                        className="image-comparison-wrapper" id="wrapper-2"
                    />
                </div>
            </div>
        );
    }
};

export default ImageComparison;