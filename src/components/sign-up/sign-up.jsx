import React, { useState } from "react";
import "./sign-up.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const {displayName, email, password, confirmPassword} = credentials

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        } 

        try {
            // createUserProfileDocument成功後會回傳一個userAuth的object其中有user
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            createUserProfileDocument(user, {displayName});
            setCredentials({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            console.log(error);
        }
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