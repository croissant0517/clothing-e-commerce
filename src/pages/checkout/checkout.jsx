import React from "react";
import { Route } from "react-router-dom";

import CheckoutItems from "../../components/checkout-items/checkout-items";
import CheckoutPayment from "../../components/checkout-payment/checkout-payment";
import CheckoutComplet from "../../components/checkout-complet/checkout-complet";

import "./checkout.scss";

const CheckOutPage = (props) => {
    return (
        <div className = "checkout-page" >
            <Route exact path = {`${props.match.path}`} component={CheckoutItems} />
            <Route exact path = {`${props.match.path}/payment`} component={CheckoutPayment} />
            <Route exact path = {`${props.match.path}/complet`} component={CheckoutComplet} />
        </div>
    );
}

export default CheckOutPage;