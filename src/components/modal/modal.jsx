import React from "react";
import { Background, ModalWrapper, CloseModalButton } from "./modal.style";

const Modal = ({children, backgroundCloseModal, buttonCloseModal, ...props}) => {

    // const handleKeyPressToCloseModal = (event) => {
    //     if (event.key === "Escape") {
    //         closeModal()
    //     }
    // }
    // // 監聽鍵盤事件
    // useEffect(() => {
    //     document.addEventListener("keydown", handleKeyPressToCloseModal);
    //     return () => document.removeEventListener("keydown", handleKeyPressToCloseModal);
    // })

    return (
        <Background {...props}
        onClick={backgroundCloseModal ? (event) => {
            if(event.target === event.currentTarget) {
                backgroundCloseModal()
            }
        } : null}
        >
            <ModalWrapper {...props}>
                {children}
                {buttonCloseModal ? <CloseModalButton onClick={() => {buttonCloseModal()}}/> : null}
            </ModalWrapper>
        </Background>
    );
}

export default Modal;