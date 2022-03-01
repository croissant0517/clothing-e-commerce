import React from "react";
import { useDispatch } from "react-redux";

import "./collection-item.scss";
import { addItem } from "../../redux/cart/cart.action";

import CustomButton from "../custom-button/custom-button";

const CollectionItem = (props) => {
    const { name, price, imageUrl } = props.item
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(addItem(props.item));
    }

    return (
        <div className = "collection-item" >
            <div className="image-container">
                <div className = "image" style = {{ backgroundImage : `url(${imageUrl})` }} >
                    <CustomButton itemButton onClick = {() => {
                        handleOnClick()
                        }
                    } >Add to cart</CustomButton>
                </div>
            </div>
            <div className = "collection-footer" >
                <span className = "name" >{name}</span>
                <span className = "price" >${price}</span>
            </div>
        </div>
    );
}

export default CollectionItem;