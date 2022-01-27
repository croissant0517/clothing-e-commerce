import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    selectErrorForUserResetPassward,
    selectResultForUserResetPassward
} from "../../redux/user/user.selectors";

import "./reset-passward-form.scss";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { RelativeSpinner } from "../with-spinner/with-spinner";
import { checkUserSessionStart, userResetPasswardStart} from "../../redux/user/user.action";

const UserResetPasswardForm = (props) => {
    const [email, setEmail] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const [sentEmailOnLoading, setSentEmailOnLoading] = useState(false);
    const dispatch = useDispatch();
    const error = useSelector(selectErrorForUserResetPassward);
    const result = useSelector(selectResultForUserResetPassward);


    const handleResetPassward = (event) => {
        event.preventDefault();
        setSentEmailOnLoading(true);
        dispatch(checkUserSessionStart());
        dispatch(userResetPasswardStart(email));
        
    }

    const handleChange = (event) => {
        setResultMessage("");
        setEmail(event.target.value);
    }

    useEffect(
        () => {
            if(error) {
                setResultMessage(error);
                setSentEmailOnLoading(false);
            } else if (result) {
                setResultMessage(result);
                setSentEmailOnLoading(false);
            }
        }
    , [error, result]);

    return (
        <div className="user-reset-passward-form" >
            <div className="go-back-sign-in-arrow" onClick={() => props.gobackSignIn(false)} >&#8592;Go back to sign in</div>
            <h2>Please enter email</h2>
            <form onSubmit = {handleResetPassward}>
                <FormInput 
                    handleChange = {handleChange} 
                    name = "email" 
                    type = "email" 
                    value = {email} 
                    label = "Email"
                    required
                />
                {resultMessage && <h4 style={ error ? { color: "red" } : { color: "green" } } >{resultMessage}</h4>}
                <CustomButton type = "submit" >Sent reset passward email</CustomButton>
            </form>
            {sentEmailOnLoading && <RelativeSpinner/>}
        </div>
    );
}

export default UserResetPasswardForm;