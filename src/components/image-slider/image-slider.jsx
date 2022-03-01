import React, { useEffect, useState } from "react";
import ImageSliderDot from "../image-slider-dot/image-slider-dot";
import ImageSliderContainer from "../image-slider-container/image-slider-container";
import CustomButton from "../custom-button/custom-button";
import { useHistory } from "react-router-dom";

import "./image-slider.scss";

import { firestore } from "../../firebase/firebase.utils";

const ImageSlider = () => {
    const [ currentImageDataIndex, setCurrentImageDataIndex ] = useState(0);
    const [ sliderData, setSliderData ] = useState([]);
    const history = useHistory();

    const handleChangeNextImage = () => {
        setCurrentImageDataIndex(currentImageDataIndex ===  sliderData.length - 1 ? 0 : currentImageDataIndex + 1 )
    }

    useEffect(() => {
        firestore.collection("sliders").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setSliderData(doc.data().sliderData);
          });
        })
      }, []);

    useEffect(() => {
        const autuChangeSlider = setInterval(handleChangeNextImage, 6000)
        return () => {
            clearInterval(autuChangeSlider);
        }
    })

    return (
        <div className="slider">
            {sliderData.map((slider, index) => 
                <div key={slider.id} className={`${index === currentImageDataIndex ? "slide-active" : "slide"}`} >
                    <ImageSliderContainer slider={slider}/>
                </div>
            )}
            <div className="slider-dots">
                {sliderData.map((slider, index) => {
                    return (
                        <ImageSliderDot key = {slider.id} currentIdex={index === currentImageDataIndex} onClick={() => {
                            setCurrentImageDataIndex(index)
                        }}/>
                    );
                })}
            </div>
            <span className="slider-text-container" >
                    <div className="slider-text-title" >Best in class tops </div>
                    <p className="slider-text-description" >We believe we can make a difference</p>
                    <CustomButton
                        onClick={() => history.push("/shop")}
                    >Shop</CustomButton>
            </span>
        </div>
    );
}

export default ImageSlider;