import React from "react";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import "./cart-dropdown.scss";

import { connect } from "react-redux";

const CartDropdown = (props) => {
    return (
        <div className = "cart-dropdown" >
            <div className = "cart-items" >
                {props.cartItems.map((cartItem) => {
                        return (<CartItem key = {cartItem.id} item = {cartItem} />);
                    })}
            </div>
            <CustomButton>CHECKOUT</CustomButton> 
        </div>
    );
}

const mapStateToProps = (state) => {
    return ({
        cartItems: selectCartItems(state)
    });
}

export default connect(mapStateToProps)(CartDropdown);