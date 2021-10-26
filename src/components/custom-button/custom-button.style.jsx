import styled, { css } from "styled-components";

const getButtonStyles = (props) => {
    if (props.isProviderSignIn) {
        return googleSignInStyles
    } else if (props.itemButton) {
        return itemButtonStyles
    } else {
        return buttonStyles
    }
}

const buttonStyles = css`
    background-color: black;
`

const googleSignInStyles = css`
    background-color: #007bff;
`

const itemButtonStyles = css`
    background-color: black;
    width: 100%;

    &:hover {
        opacity: 0.7;
    }
`

export const CustomButtonContainer = styled.button`
    width: 100%;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    color: white;
    text-transform: uppercase;
    font-weight: bolder;
    border: none;
    cursor: pointer;
    margin-top: 10px;

    ${getButtonStyles}
`