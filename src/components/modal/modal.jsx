import React from "react";
import { Background, ModalWrapper, CloseModalButton } from "./modal.style";

const Modal = ({children, closeModal, ...props}) => {

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
        <Background 
        onClick={closeModal ? (event) => {
            if(event.target === event.currentTarget) {
                closeModal()
            }
        } : null}
        >
            <ModalWrapper {...props}>
                {children}
                {closeModal ? <CloseModalButton onClick={() => {closeModal()}}/> : null}
            </ModalWrapper>
        </Background>
    );
}

export default Modal;