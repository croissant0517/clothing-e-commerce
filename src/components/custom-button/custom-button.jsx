import React from "react";
import "./custom-button.scss";

const CustomButton = (props) => {
    return (
        <button className = {`${props.isGoogleSignIn ? "google-sign-in" : ""} custom-button`} type = {props.type} onClick = {props.onClick}>
            {props.children}
        </button>
    );
}

export default CustomButton;