import React from "react";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-dropdown.scss";

const CartDropdown = (props) => {
    return (
        <div className = "cart-dropdown" >
            <div className = "cart-items" >
                {props.cartItems.map((cartItem) => {
                        return (<CartItem key = {cartItem.id} item = {cartItem} />);
                    })}
            </div>
            <Link  to = "/checkout" >
                <CustomButton onClick = {() => {props.dispatch(toggleCartHidden())}} >CHECKOUT</CustomButton> 
            </Link>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
})

export default connect(mapStateToProps)(CartDropdown);