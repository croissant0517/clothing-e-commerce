import React, { Component } from "react";
import "./sign-in.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubit = async (event) => {
        event.preventDefault();

        const {email, password} = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            // 登入成功後淨空欄位
            this.setState({
                email: "",
                password: ""
            })
        } catch(error) {
            console.log(error);
        }
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
                        <CustomButton type = "button" onClick = {signInWithGoogle} isProviderSignIn >Sign in with Google </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn; 