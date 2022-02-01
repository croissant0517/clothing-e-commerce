import React, { useEffect, useState } from "react";
import ImageSliderDot from "../image-slider-dot/image-slider-dot";
import ImageSliderContainer from "../image-slider-container/image-slider-container";

import "./image-slider.scss";

import { SliderData } from "../../SliderData";

const ImageSlider = () => {

    const [currentImageDataIndex, setCurrentImageDataIndex] = useState(0);

    const handleChangeNextImage = () => {
        setCurrentImageDataIndex(currentImageDataIndex ===  SliderData.length - 1 ? 0 : currentImageDataIndex + 1 )
    }

    useEffect(() => {
        const autuChangeSlider = setInterval(handleChangeNextImage, 6000)
        return () => {
            clearInterval(autuChangeSlider);
        }
    })

    return (
        <div className="slider">
            {SliderData.map((slider, index) => 
                <div key={slider.id} className={`${index === currentImageDataIndex ? "slide-active" : "slide"}`} >
                    <ImageSliderContainer slider={slider}/>
                </div>
            )}
            <div className="slider-dots">
                {SliderData.map((slider, index) => {
                    return (
                        <ImageSliderDot key = {slider.id} currentIdex={index === currentImageDataIndex} onClick={() => {
                            setCurrentImageDataIndex(index)
                        }}/>
                    );
                })}
            </div>
        </div>
    );
}

export default ImageSlider;