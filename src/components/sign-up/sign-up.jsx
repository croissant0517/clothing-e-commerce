import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { signUpStart } from "../../redux/user/user.action";

import "./sign-up.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const {displayName, email, password, confirmPassword} = credentials

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        } 
        dispatch(signUpStart({email, password, displayName}));
    }

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

        
    return(
        <div className = "sign-up" >
            <h2 className = "title">Sign Up</h2>
            <span>Sign up with your email</span>
            <form className = "sign-up-form" onSubmit = {handleSubmit}>
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
                <CustomButton type = "submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;