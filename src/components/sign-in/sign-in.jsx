import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./sign-in.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { googleSignInStart, facebookSignInStart, emailSignInStart } from "../../redux/user/user.action";

const  SignIn = (props) => {
    const [credentials, setCredentials] = useState({
        email: "",
        password:""
    })

    const { email, password } = credentials

    const dispatch = useDispatch();

    const handleSubit = (event) => {
        event.preventDefault();
        dispatch(emailSignInStart({ email, password }));
    }

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    return(
        <div className = "sign-in" >
            <h2>Sign In</h2>
            <form onSubmit = {handleSubit}>
                <FormInput 
                    handleChange = {handleChange} 
                    name = "email" 
                    type = "email" 
                    value = {email} 
                    label = "Email"
                    required
                />
                <FormInput 
                    handleChange = {handleChange} 
                    name = "password" 
                    type = "password" 
                    value = {password}
                    label = "Password" 
                    required
                />              
                    <CustomButton type = "submit" > Sign in </CustomButton>
                    <CustomButton type = "button" onClick = {() => dispatch(googleSignInStart())} googleSignIn >Sign in with Google </CustomButton>
                    <CustomButton type = "button" onClick = {() => dispatch(facebookSignInStart())} facebookSignIn >Sign in with Facebook </CustomButton>
            </form>
        </div>
    );
}

export default SignIn; 