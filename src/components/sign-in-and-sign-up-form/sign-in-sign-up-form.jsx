import React, { useState, useEffect } from "react";

import "./sign-in-sign-up-form.scss";

import SignIn from "../sign-in/sign-in";
import SignUp from "../sign-up/sign-up";
import { useDispatch } from "react-redux";
import { checkUserSessionStart } from "../../redux/user/user.action";

const SignInAndSignUpForm = () => {
    const dispatch = useDispatch();
    const [ alreadyHaveAccount, setAlreadyHaveAccount ] = useState(true);
    
    useEffect(
        () => {
            return () => dispatch(checkUserSessionStart());
        }
    );

    return (
        <div className = "sign-in-sign-up-form" >
            <div className="sign-in-sign-up-container" >
                {alreadyHaveAccount ? <SignIn /> : <SignUp />}
                <div className="text-content" >
                    {alreadyHaveAccount ? "I don't have an account" : "Already have an account?"}
                    <div className="switch-text" onClick={() => setAlreadyHaveAccount(!alreadyHaveAccount)} >
                        {alreadyHaveAccount ? "Sign up" : "Sign in"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInAndSignUpForm;