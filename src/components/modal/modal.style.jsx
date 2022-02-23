import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5"

const getModalWrapperStyles = (props) => {
    if (props.cartModalStyles) {
        return cartModalStyles
    } else if (props.orderDetailModalStyles) {
        return OrderDetailModalStyles
    }
}

const cartModalStyles = css`
    width: 500px;
    height: 600px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    animation: popout 200ms ease;

    @media screen and (max-width: 900px) {
        width: 100vw;
        height: 100vw;
    }
`

const OrderDetailModalStyles = css`
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    width: 800px;
    height: auto;
    justify-self: center;
    align-items: center;
    animation: popout 200ms ease;

    @media screen and (max-width: 900px) {
        width: 100vw;
        height: 80vh;
    }
`

export const ModalWrapper = styled.div`
    position: relative;

    ${getModalWrapperStyles}

    @keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
    }

    @keyframes popout {
        from{transform:scale(0)}
        to{transform:scale(1)}
    }
`

const getBackgroundStyles = (props) => {
    if (props.cartBackgroundStyles) {
        return cartBackgroundStyles
    } else if (props.OrderDetailBackgroundStyles) {
        return OrderDetailBackgroundStyles
    }
}

const cartBackgroundStyles = css`
    background: rgba(0, 0, 0, 0.8);
    align-items: center;
`

const OrderDetailBackgroundStyles = css`
    background: rgba(0, 0, 0, 0.8);
    align-items: center;
`

export const Background = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 100;
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