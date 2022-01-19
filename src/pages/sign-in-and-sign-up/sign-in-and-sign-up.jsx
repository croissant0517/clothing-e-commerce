import React from "react";

import "./sign-in-and-sign-up.scss";

import SignInAndSignUpForm from "../../components/sign-in-and-sign-up-form/sign-in-sign-up-form";


const SignInAndSignUpPage = () => {
    return (
        <div className = "sign-in-sign-up-container" >
            <SignInAndSignUpForm />
        </div>
    );
}

export default SignInAndSignUpPage;