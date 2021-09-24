import React, { Component } from "react";
import "./sign-up.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends Component {
    constructor() {
        super()

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        } 

        try {
            // createUserProfileDocument成功後會回傳一個userAuth的object其中有user
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return(
            <div className = "sign-up" >
                <h2 className = "title">Sign Up</h2>
                <span>Sign up with your email</span>
                <form className = "sign-up-form" onSubmit = {this.handleSubmit}>
                    <FormInput
                        type = "text"
                        name = "displayName"
                        value = {displayName}
                        handleChange = {this.handleChange} 
                        label = "Display Name"
                        required
                    >
                    </FormInput>
                    <FormInput
                        type = "email"
                        name = "email"
                        value = {email}
                        handleChange = {this.handleChange} 
                        label = "Email"
                        required
                    >
                    </FormInput>
                    <FormInput
                        type = "password"
                        name = "password"
                        value = {password}
                        handleChange = {this.handleChange} 
                        label = "Password"
                        required
                    >
                    </FormInput>
                    <FormInput
                        type = "password"
                        name = "confirmPassword"
                        value = {confirmPassword}
                        handleChange = {this.handleChange} 
                        label = "Confirm Password"
                        required
                    >
                    </FormInput>
                    <CustomButton type = "submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;