import React from "react";

import Modal from "../modal/modal";

import "./confirm-modal.scss";

const ConfirmModal= ({itemName, itemImage}) => {
    return (
        <Modal normalBackgroundStyles noCloseModalButton>
            <div className="confirm-modal-container" >
                <div className = "image-container" >
                    <img src = {itemImage} alt = "item" />
                </div>
                <h1>Add 1 {itemName} to the shopping cart</h1>
            </div>
        </Modal>
    );
}

export default ConfirmModal;