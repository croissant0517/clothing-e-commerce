import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckOutItem from "../../components/checkout-item/checkout-item";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button";

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

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
            {props.cartItems.map((cartItem) => <CheckOutItem key = {cartItem.id} item = {cartItem} />)}
            <div className = "total" >
                <span>TOTAL: NT${props.total}</span>
            </div>
            <div className = "stripe-checkoutForm">
                <StripeCheckoutButton price = {props.total} />
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

export default connect(mapStateToProps)(checkOutPage);