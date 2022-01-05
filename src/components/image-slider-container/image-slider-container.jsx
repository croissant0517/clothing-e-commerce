import React from "react";
import "./image-slider-container.scss";

const ImageSliderContainer = (props) => {
    return (
        <div className = "slide-container-item" >
            <div className = "slide-container-image" style = {{ backgroundImage: `url(${ props.slider.imageUrl })` }} >
            </div>
        </div>
    );
}

export default ImageSliderContainer;