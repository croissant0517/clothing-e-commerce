import React, { useState, useEffect } from "react";

import "./sign-in-sign-up-form.scss";

import SignIn from "../sign-in/sign-in";
import SignUp from "../sign-up/sign-up";
import UserResetPasswardForm from "../reset-passward-form/reset-passward-form";
import { useDispatch } from "react-redux";
import { checkUserSessionStart } from "../../redux/user/user.action";

const SignInAndSignUpForm = () => {
    const dispatch = useDispatch();
    const [ alreadyHaveAccount, setAlreadyHaveAccount ] = useState(true);
    const [ forgotPasswardOnClick, setForgotPasswardOnClick ] = useState(false);
    
    useEffect(
        () => {
            return () => dispatch(checkUserSessionStart());
        }
    );

    return (
        <div className = "sign-in-sign-up-form" >
            <div className="sign-in-sign-up-container" >
                {alreadyHaveAccount ? 
                <div>
                    {forgotPasswardOnClick ? 
                    <UserResetPasswardForm gobackSignIn={setForgotPasswardOnClick} /> 
                    : 
                    <div>
                        <SignIn />
                        <div className="forgot-passward" onClick={() => setForgotPasswardOnClick(!forgotPasswardOnClick)} >Forgot password?</div>
                    </div>
                    } 
                </div>
                : 
                <SignUp />
                }
                <div className="text-content" >
                    {alreadyHaveAccount ? "I don't have an account" : "Already have an account?"}
                    <div className="switch-text" onClick={() => {
                        setAlreadyHaveAccount(!alreadyHaveAccount)
                        setForgotPasswardOnClick(false)
                    }} >
                        {alreadyHaveAccount ? "Sign up" : "Sign in"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInAndSignUpForm;