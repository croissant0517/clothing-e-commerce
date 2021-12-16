import React from "react";
import Directory from "../../components/directory/directory";
import ImageSlider from "../../components/image-slider/image-slider";
import EmailSubscribe from "../../components/email-subscribe/email-subscribe";

import "./homepage.scss"

const HomePage = () => {
    return (
        <div className = "homepage">
            <ImageSlider />
            <Directory />
            <EmailSubscribe />
        </div>
    );
}

export default HomePage;