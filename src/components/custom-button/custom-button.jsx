import React from "react";
import "./custom-button.scss";

const CustomButton = (props) => {
    return (
        <button className = "custom-button" type = {props.type} >
            {props.children}
        </button>
    );
}

export default CustomButton;