import React, { useState } from "react";
import { connect } from "react-redux";

import "./collection-item.scss";
import { addItem } from "../../redux/cart/cart.action";

import CustomButton from "../custom-button/custom-button";
import ConfirmModal from "../confirm-modal/confirm-modal";

const CollectionItem = (props) => {
    const { name, price, imageUrl } = props.item

    const [jumpConfirm, setJumpConfirm] = useState(false)

    const handleOnClick = () => {
        setTimeout(() => {
            setJumpConfirm(false)
        }, 1000)
        props.handleAddItem(props.item)
    }
    
    return (
        <div className = "collection-item" >
            <div className = "image" style = {{ backgroundImage : `url(${imageUrl})` }} >
                <CustomButton itemButton onClick = {() => {
                    setJumpConfirm(true)
                    handleOnClick()
                    }
                } >Add to cart</CustomButton>
            </div>
            <div className = "collection-footer" >
                <span className = "name" >{name}</span>
                <span className = "price" >NT${price}</span>
            </div>
            {jumpConfirm ? <ConfirmModal itemName={name} itemImage={imageUrl} /> : null}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
   return ({
       handleAddItem: (item) => dispatch(addItem(item))
   });
}

export default connect(null, mapDispatchToProps)(CollectionItem);