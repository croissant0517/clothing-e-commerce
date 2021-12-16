import React from "react";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import Modal from "../modal/modal";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-modal.scss";

const CartModal = (props) => {
    return (
        <Modal cartModalStyles cartBackgroundStyles closeModalButton closeModal = {() => {props.dispatch(toggleCartHidden())}}>
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
        </Modal>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
})


// 假設我們只有一個action需要做dispatch可以不必在connect中給予第二個參數
// 也就是mapDispatchToProps 這樣就會在props中給予一個dispatch讓我們可以直接使用 ex:22行


export default connect(mapStateToProps)(CartModal);