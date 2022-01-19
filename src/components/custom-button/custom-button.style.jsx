import styled, { css } from "styled-components";

const getButtonStyles = (props) => {
    if (props.googleSignIn) {
        return googleSignInStyles
    } else if (props.facebookSignIn) {
        return facebookSingInStyle
    } else if (props.itemButton) {
        return itemButtonStyles
    } else {
        return buttonStyles
    }
}

const buttonStyles = css`
    border-radius: 5px;
    background-color: #1c1d1f;

    &:hover {
        background-color: black;
    }
`

const googleSignInStyles = css`
    border-radius: 5px;
    background-color: #4285F4;
`

const facebookSingInStyle = css`
    border-radius: 5px;
    background-color: #3B5998;
`

const itemButtonStyles = css`
    height: 0px;
    background-color: black;
    width: 100%;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export const CustomButtonContainer = styled.button`
    font-family: sans-serif;
    width: auto;
    height: auto;
    padding: 1rem;
    letter-spacing: 0.5px;
    /* line-height: 50px; */
    color: white;
    text-transform: uppercase;
    font-size: clamp(0.8rem, 2.5vw, 1rem);
    border: none;
    cursor: pointer;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: .5s;

    ${getButtonStyles}
`