import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5"

const getModalWrapperStyles = (props) => {
    if (props.cartModalStyles) {
        return cartModalStyles
    } else {
        return nomalModalStyles
    }
}

const nomalModalStyles = css`
    width: auto;
    height: auto;

    @media screen and (max-width: 820px) {
        width: 60vw;
    }
`

const cartModalStyles = css`
    width: 50vw;
    height: 50vh;

    @media screen and (max-width: 820px) {
        width: 100vw;
    }
`

export const ModalWrapper = styled.div`
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
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
    } else if (props.normalBackgroundStyles) {
        return normalBackgroundStyles
    }
}

const cartBackgroundStyles = css`
    background: rgba(0, 0, 0, 0.8);
`

const normalBackgroundStyles = css`
    background: rgba(0, 0, 0, 0);
`

export const Background = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    bottom: 0;
    right: 0;

    ${getBackgroundStyles}
`

export const CloseModalButton = styled(IoClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 3;
`