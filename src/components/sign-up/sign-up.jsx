import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import axios from "axios";

import { signUpStart, checkUserSessionStart } from "../../redux/user/user.action";

import { selectErrorForSignUp } from "../../redux/user/user.selectors";

import "./sign-up.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const {displayName, email, password, confirmPassword} = credentials
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const error = useSelector(selectErrorForSignUp);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(checkUserSessionStart());
        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        }
        dispatch(signUpStart({email, password, displayName}));
    }

    const handleChange = (event) => {
        setErrorMessage("");
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }
    
    useEffect(
        () => {
            setErrorMessage(error)
        }
    , [error]);
        
    return(
        <div className = "sign-up" >
            <h2 className = "title">Sign Up</h2>
            <span>Sign up with your email</span>
            <form onSubmit = {handleSubmit}>
                <FormInput
                    type = "text"
                    name = "displayName"
                    value = {displayName}
                    handleChange = {handleChange} 
                    label = "Display Name"
                    required
                >
                </FormInput>
                <FormInput
                    type = "email"
                    name = "email"
                    value = {email}
                    handleChange = {handleChange} 
                    label = "Email"
                    required
                >
                </FormInput>
                <FormInput
                    type = "password"
                    name = "password"
                    value = {password}
                    handleChange = {handleChange} 
                    label = "Password"
                    required
                >
                </FormInput>
                <FormInput
                    type = "password"
                    name = "confirmPassword"
                    value = {confirmPassword}
                    handleChange = {handleChange} 
                    label = "Confirm Password"
                    required
                >
                </FormInput>
                {errorMessage && <h3>{errorMessage}</h3>}
                <CustomButton type = "submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;