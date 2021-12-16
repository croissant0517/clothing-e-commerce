import React from "react";
import {IconContext} from "react-icons";
import {BsCircleFill} from "react-icons/bs";

import "./image-slider-dot.scss";

const ImageSliderDot = ({ currentIdex, onClick }) => {
    return (
        <div className="slide-dots">
            <IconContext.Provider  value={currentIdex ? { color: 'black', className: "slide-dot-active" } : { color: 'gray', className: "slide-dot" }}>
                <div>
                    <BsCircleFill onClick={onClick}/>
                </div>
            </IconContext.Provider>
        </div>
    );
}

export default ImageSliderDot;