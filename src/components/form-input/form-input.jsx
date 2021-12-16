import React from "react";
import "./form-input.scss";

const FormInput = (props) => {
    return (
        <div className = "group" >
            <input
                className = "form-input"
                name = {props.name}
                onChange = {props.handleChange}
                type = {props.type}
                value = {props.value}
                required = {props.required}
                placeholder = {props.placeholder}
            />
            {/* 是否有label的傳入？ 如果有的話則回傳一個label的HTML tag 並且將className命名為"shrink" 並且始終都有"form-input-label"這個className */}
            {props.label ? (<label className = {`${props.value ? "shrink" : ""} form-input-label`} >{props.label}</label>) : null}
        </div>
    );
}

export default FormInput;