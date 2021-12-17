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
    height: 10px;
    background-color: black;
    width: 100%;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &:active {
        transform: scale(0.99);
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