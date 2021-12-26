import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5"

const getModalWrapperStyles = (props) => {
    if (props.cartModalStyles) {
        return cartModalStyles
    } else if (props.confirmModalStyles) {
        return confirmModalStyles
    }
}

const confirmModalStyles = css`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    width: auto;
    height: auto;
    bottom: 0;
    justify-self: center;
`

const cartModalStyles = css`
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    width: 50vw;
    height: 50vh;

    @media screen and (max-width: 820px) {
        width: 100vw;
    }
`

export const ModalWrapper = styled.div`
    background-color: #fff;
    color: #000;
    position: fixed;
    z-index: 3;
    animation: fade 200ms ease-out;

    ${getModalWrapperStyles}

    @keyframes fade {
    from {
        opacity: 0;
        transform: scale3D(0.95, 0.95, 0.95);
    }
    to {
        opacity: 1;
        transform: scale3D(1, 1, 1);
    }
    }
`

const getBackgroundStyles = (props) => {
    if (props.cartBackgroundStyles) {
        return cartBackgroundStyles
    } else if (props.confirmBackgroundStyles) {
        return confirmBackgroundStyles
    }
}

const cartBackgroundStyles = css`
    background: rgba(0, 0, 0, 0.8);
`

const confirmBackgroundStyles = css`
    background: rgba(0, 0, 0, 0);
`

export const Background = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    bottom: 0;
    right: 0;
    animation: fade 200ms ease-out;
    overflow: hidden;

    ${getBackgroundStyles}
`

export const CloseModalButton = styled(IoClose)`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: clamp(1rem, 5vw, 2rem);
    padding: 0;
    z-index: 3;
`