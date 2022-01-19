import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5"

const getModalWrapperStyles = (props) => {
    if (props.cartModalStyles) {
        return cartModalStyles
    } else if (props.confirmModalStyles) {
        return confirmModalStyles
    } else if (props.confirmSignOutModalStyles) {
        return confirmSignOutModalStyles
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
    width: 500px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 900px) {
        width: 100vw;
        height: 100vw;
    }
`

const confirmSignOutModalStyles = css`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    width: auto;
    height: auto;
    justify-self: center;
`

export const ModalWrapper = styled.div`
    position: relative;
    z-index: 3;
    animation: fade 200ms ease-out;

    ${getModalWrapperStyles}

    @keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
    }
`

const getBackgroundStyles = (props) => {
    if (props.cartBackgroundStyles) {
        return cartBackgroundStyles
    } else if (props.confirmBackgroundStyles) {
        return confirmBackgroundStyles
    } else if (props.confirmSignOutBackgroundStyles) {
        return confirmSignOutBackgroundStyles
    }
}

const cartBackgroundStyles = css`
    background: rgba(0, 0, 0, 0.8);
    align-items: center;
`

const confirmBackgroundStyles = css`
    background: rgba(0, 0, 0, 0.5);
    align-items: flex-end;
`

const confirmSignOutBackgroundStyles = css`
    background: rgba(0, 0, 0, 0.8);
    align-items: center;
`

export const Background = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
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