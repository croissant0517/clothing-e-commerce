import React, { useEffect, useState } from "react";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"
import ImageSliderDot from "../image-slider-dot/image-slider-dot";

import "./image-slider.scss";

import { SliderData } from "../../SliderData";

const ImageSlider = () => {

    const [currentImageDataIndex, setCurrentImageDataIndex] = useState(0); 

    const handleChangeNextImage = () => {
        setCurrentImageDataIndex(currentImageDataIndex ===  SliderData.length - 1 ? 0 : currentImageDataIndex + 1 )
    }

    const handleChangePrevImage = () => {
        setCurrentImageDataIndex(currentImageDataIndex ===  0 ? SliderData.length - 1 : currentImageDataIndex - 1 )
    }

    // const handleKeyPressToChangSlider = (event) => {
    //     if (event.key === "Escape") {
    //         handleChangePrevImage()
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener("keydown", handleKeyPressToChangSlider);
    //     return () => document.removeEventListener("keydown", handleKeyPressToChangSlider);
    // })

    useEffect(() => {
        const autuChangeSlider = setInterval(handleChangeNextImage, 10000)
        return () => {
            clearInterval(autuChangeSlider);
        }
    })

    return (
        <div className="slider">
            <BsChevronCompactLeft className="left-arrow" onClick={handleChangePrevImage}/>
            <div className="slide-container" >
                {SliderData.map((slider, index) => {
                    return (
                        <div key = {slider.id} className={`${index === currentImageDataIndex ? "slide-active" : "slide"}`}>
                                {index === currentImageDataIndex && <img className="slider-image" src={slider.imageUrl} alt={slider.title}/>}
                        </div>
                    );
                })}
            </div>
            <BsChevronCompactRight className="right-arrow" onClick={handleChangeNextImage}/>
            <div className="slider-dots">
                {SliderData.map((slider, index) => {
                    return (
                        <ImageSliderDot key = {index} currentIdex={index === currentImageDataIndex} onClick={() => {
                            setCurrentImageDataIndex(index)
                        }}/>
                    );
                })}
            </div>
        </div>
    );
}

export default ImageSlider;