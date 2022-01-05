import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import CheckOutItem from "../../components/checkout-item/checkout-item";
import StripeCheckoutForm from "../../components/stripe-button/stripe-payment-form";
import CustomButton from "../../components/custom-button/custom-button";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

import { clearCart } from "../../redux/cart/cart.action";

import "./checkout.scss";

const checkOutPage = (props) => {
    return (
        <div className = "checkout-page" >
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
            { props.total ? 
            (props.cartItems.map((cartItem) => <CheckOutItem key = {cartItem.id} item = {cartItem} />))
            : (
                <div>
                    <h3>Your shopping cart is empty &#x1F622;</h3>
                    <Link className="cart-empty-warning" to = "/shop" >
                        Go to shop
                    </Link>
                </div>
            )}
            <div className = "total-clear-all-button" >
                <div className = "total" >
                    <span>SUBTOTAL: NT${props.total}</span>
                </div>
                <CustomButton className = "clear-all-button" onClick = {props.handleClearCart}>CLEAR ALL</CustomButton>
            </div>
            <div className = "stripe-checkoutForm">
                <StripeCheckoutForm price = {props.total} />
                <div className = "test-warning">
                    *Please use the following test credit card for payment*
                    <br/>
                    4242-4242-4242-4242 - 01/23 - CVV : 123 - ZIP : 12345               
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const mapDispatchToProps = (dispatch) => ({
    handleClearCart: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(checkOutPage);