import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectErrorForSignIn } from "../../redux/user/user.selectors";

import "./sign-in.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { googleSignInStart, facebookSignInStart, emailSignInStart, checkUserSessionStart} from "../../redux/user/user.action";

const  SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password:""
    })
    const { email, password } = credentials
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const error = useSelector(selectErrorForSignIn);

    const handleSubit = (event) => {
        event.preventDefault();
        dispatch(checkUserSessionStart());
        dispatch(emailSignInStart({ email, password }));
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
                {errorMessage && <h3>{errorMessage}</h3>}
                <CustomButton type = "submit" > Sign in </CustomButton>
                <CustomButton type = "button" onClick = {() => dispatch(googleSignInStart())} googleSignIn >Sign in with Google </CustomButton>
                <CustomButton type = "button" onClick = {() => dispatch(facebookSignInStart())} facebookSignIn >Sign in with Facebook </CustomButton>
            </form>
        </div>
    );
}

export default SignIn;