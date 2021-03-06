import React, { useEffect } from "react";
import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import Modal from "../modal/modal";

import { selectCartItems, selectCartHidden, selectCartTotal } from "../../redux/cart/cart.selectors";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-modal.scss";

const CartModal = () => {

    const cartItems = useSelector(selectCartItems);
    const hidden = useSelector(selectCartHidden);
    const total = useSelector(selectCartTotal);

    const dispatch = useDispatch()

    const closeModal = () => dispatch(toggleCartHidden())
    
    // 如果cart-modal開啟，則將body的滾輪禁止使用
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = hidden ? null : 'hidden';
        return () => {
            body.style.overflow = "auto"
        }
      }, [hidden])

    return (
        <Modal cartModalStyles cartBackgroundStyles backgroundCloseModal = {closeModal} buttonCloseModal={closeModal}>
            <div className = "cart-dropdown" >
                <div 
                    className = "cart-items" 
                    style={ cartItems.length > 1 ? { overflowY: "scroll" } : { overflowY: "null" }}
                >
                    { cartItems.length ? 
                    <>
                    {cartItems.map((cartItem) => {
                            return (<CartItem key = {cartItem.id} item = {cartItem} />);
                    })}
                    </>
                    :
                    <div className="cart-empty-text" >
                        <h4>Your cart is empty</h4>
                    </div>
                    }
                </div>
                <div className="cart-total" >
                    <div className="cart-total-title" >
                        Estimated Total
                    </div>
                    <div className="cart-total-value" >
                        ${total}
                    </div>
                </div>
                <div className="cart-button" >
                    <Link  to = "/checkout" >
                        <CustomButton onClick = {() => {dispatch(toggleCartHidden())}} >CHECKOUT</CustomButton> 
                    </Link>
                </div>
            </div>
        </Modal>
    );
}

export default CartModal;