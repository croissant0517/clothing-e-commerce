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
                <p>Add 1 {itemName} to the shopping cart</p>
            </div>
        </Modal>
    );
}

export default ConfirmModal;