import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./collection-item.scss";
import { addItem } from "../../redux/cart/cart.action";

import CustomButton from "../custom-button/custom-button";
import ConfirmModal from "../confirm-modal/confirm-modal";

let timer;

const CollectionItem = (props) => {
    const { name, price, imageUrl } = props.item
    const [jumpConfirmModal, setJumpConfirmModal] = useState(false)
    const dispatch = useDispatch();

    const handleOnClick = () => {
        timer = setTimeout(() => {
            setJumpConfirmModal(false);
            clearTimeout(timer);
        }, 1500)
        dispatch(addItem(props.item));
    }

    const handleCloseModalOnClick = () => {
        setJumpConfirmModal(false);
        clearTimeout(timer);
    }

    return (
        <div className = "collection-item" >
            <div className="image-container">
                <div className = "image" style = {{ backgroundImage : `url(${imageUrl})` }} >
                    <CustomButton itemButton onClick = {() => {
                        setJumpConfirmModal(true)
                        handleOnClick()
                        }
                    } >Add to cart</CustomButton>
                </div>
            </div>
            <div className = "collection-footer" >
                <span className = "name" >{name}</span>
                <span className = "price" >${price}</span>
            </div>
            {jumpConfirmModal ? <ConfirmModal closeModal={handleCloseModalOnClick} itemName={name} itemImage={imageUrl} /> : null}
        </div>
    );
}

export default CollectionItem;