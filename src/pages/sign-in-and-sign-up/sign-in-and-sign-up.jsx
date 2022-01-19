import React, { useEffect } from "react";

import "./sign-in-and-sign-up.scss";

import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import { useDispatch } from "react-redux";
import { checkUserSessionStart } from "../../redux/user/user.action";

const SignInAndSignUpPage = () => {
    const dispatch = useDispatch()
    
    useEffect(
        () => {
            return () => dispatch(checkUserSessionStart());
        }
    );

    return (
        <div className = "sign-in-sign-up" >
            <SignIn />
            <SignUp />
        </div>
    );
}

export default SignInAndSignUpPage;