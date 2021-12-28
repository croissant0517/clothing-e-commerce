import React, { useState } from "react";
import "./sign-in.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth, signInWithGoogle, signInWithFacebook } from "../../firebase/firebase.utils";

const  SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password:""
    })

    const { email, password } = credentials

    const handleSubit = async (event) => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password)
            // 登入成功後淨空欄位
            setCredentials({
                email: "",
                password: ""
            })
        } catch(error) {
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
                    <CustomButton type = "button" onClick = {signInWithGoogle} isProviderSignIn >Sign in with Google </CustomButton>
                    <CustomButton type = "button" onClick = {signInWithFacebook} isProviderSignIn >Sign in with Facebook </CustomButton>
            </form>
        </div>
    );
}


export default SignIn; 