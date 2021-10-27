import React from "react";
import { connect } from "react-redux";

import "./collection-item.scss";
import { addItem } from "../../redux/cart/cart.action";

import CustomButton from "../custom-button/custom-button";

const CollectionItem = (props) => {
    const { name, price, imageUrl } = props.item

    const handleOnClick = () => {
        props.handleAddItem(props.item)
        alert("Add 1 item to the shopping cart")
    }
    
    return (
        <div className = "collection-item" >
            <div className = "image" style = {{ backgroundImage : `url(${imageUrl})` }} >
            </div>
            <div className = "collection-footer" >
                <span className = "name" >{name}</span>
                <span className = "price" >NT${price}</span>
            </div>
            <CustomButton itemButton onClick = {handleOnClick} >Add to cart</CustomButton>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
   return ({
       handleAddItem: (item) => dispatch(addItem(item))
   });
}

export default connect(null, mapDispatchToProps)(CollectionItem);