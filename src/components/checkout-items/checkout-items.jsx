import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import CustomButton from "../custom-button/custom-button";
import CheckOutItem from "../../components/checkout-item/checkout-item";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

import "./checkout-items.scss";

const CheckoutItems = (props) => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    return (
        <div className="checkout-items" >
            <div className = "checkout-header" >
                <div className = "header-block" >
                    <span>Product</span>
                </div>
                <div className = "header-block" >
                    <span>Description</span>
                </div>
                <div className = "header-block" >
                    <span>Quantity</span>
                </div>
                <div className = "header-block" >
                    <span>Price</span>
                </div>
                <div className = "header-block" >
                    <span>Remove</span>
                </div>
            </div>
            { total ? 
            (cartItems.map((cartItem) => <CheckOutItem key = {cartItem.id} item = {cartItem} />))
            : (
                <div>
                    <h3>Your shopping cart is empty &#x1F622;</h3>
                    <Link className="cart-empty-warning" to = "/shop" >
                        Go to shop
                    </Link>
                </div>
            )}
            <div className="button-section">
                {!!total && <CustomButton onClick = {() => props.history.push(`${props.match.path}/payment`)} >Confirm and Go Pay</CustomButton>}
            </div>
        </div>
    );
}

export default CheckoutItems;