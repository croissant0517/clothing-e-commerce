import React from "react";
import { Background, ModalWrapper, CloseModalButton } from "./modal.style";

const Modal = ({children, CloseModal, ...props}) => {

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
        onClick={CloseModal ? (event) => {
            if(event.target === event.currentTarget) {
                CloseModal()
            }
        } : null}
        >
            <ModalWrapper {...props}>
                {children}
                {CloseModal ? <CloseModalButton onClick={() => {CloseModal()}}/> : null}
            </ModalWrapper>
        </Background>
    );
}

export default Modal;