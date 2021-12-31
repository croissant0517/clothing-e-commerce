import React, { useState } from "react";
import { connect } from "react-redux";

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

    const handleSubit = async (event) => {
        event.preventDefault();
        props.handleEmailSignInStart(email, password);
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
                    <CustomButton type = "button" onClick = {props.handleGoogleSignInStart} googleSignIn >Sign in with Google </CustomButton>
                    <CustomButton type = "button" onClick = {props.handleFacebookSignInStart} facebookSignIn >Sign in with Facebook </CustomButton>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    handleGoogleSignInStart: () => dispatch(googleSignInStart()),
    handleFacebookSignInStart: () => dispatch(facebookSignInStart()),
    handleEmailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn); 