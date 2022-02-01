import React from "react";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import "./email-subscribe.scss";

const EmailSubscribe = () => {
    return (
        <div className="email-subscribe-contaier" >
            <div className="email-subscribe-content" >
                <h1>Get Access to Exclusive Offers</h1>
                <p>Subscribe for your newsletter below to get $10 off your firt order!</p>
                <form action="#">
                    <FormInput 
                        name = "email" 
                        type = "email"
                        placeholder = "Enter your email"
                        required
                    />
                    <CustomButton type = "submit" > Subscribe </CustomButton>
                </form>
            </div>
        </div>
    );
}

export default EmailSubscribe;