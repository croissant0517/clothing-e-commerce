import React, { Component } from "react";
import "./sign-in.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubit = (event) => {
        event.preventDefault();
        this.setState({
            email: "",
            password: ""
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
            <div className = "sign-in" >
                <h2>Sign In</h2>
                <form onSubmit = {this.handleSubit}>
                    <FormInput 
                        handleChange = {this.handleChange} 
                        name = "email" 
                        type = "email" 
                        value = {this.state.email} 
                        label = "email"
                        required 
                    />
                    {/* <label>Email</label> */}
                    <FormInput 
                        handleChange = {this.handleChange} 
                        name = "password" 
                        type = "password" 
                        value = {this.state.password}
                        label = "email" 
                        required
                    />
                    {/* <label>Password</label> */}
                    
                        <CustomButton type = "submit" > Sign in </CustomButton>
                        <CustomButton onClick = {signInWithGoogle} isGoogleSignIn >Sign in with Google </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn; 