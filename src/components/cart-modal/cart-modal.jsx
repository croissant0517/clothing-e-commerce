import React, { useEffect } from "react";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import Modal from "../modal/modal";

import { selectCartItems, selectCartHidden } from "../../redux/cart/cart.selectors";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-modal.scss";

const CartModal = () => {

    const cartItems = useSelector(selectCartItems);
    const hidden = useSelector(selectCartHidden);

    const dispatch = useDispatch()
    
    // 如果cart-modal開啟，則將body的滾輪禁止使用
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = hidden ? null : 'hidden';
        return () => {
            body.style.overflow = "auto"
        }
      }, [hidden])

    return (
        <Modal cartModalStyles cartBackgroundStyles CloseModal = {() => {dispatch(toggleCartHidden())}} >
            <div className = "cart-dropdown" >
                <div className = "cart-items" >
                    {cartItems.map((cartItem) => {
                            return (<CartItem key = {cartItem.id} item = {cartItem} />);
                        })}
                </div>
                <Link  to = "/checkout" >
                    <CustomButton onClick = {() => {dispatch(toggleCartHidden())}} >CHECKOUT</CustomButton> 
                </Link>
            </div>
        </Modal>
    );
}

export default CartModal;