import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import { selectCurrentUser } from "../../redux/user/user.selectors";

import CheckoutItems from "../../components/checkout-items/checkout-items";
import CheckoutPayment from "../../components/checkout-payment/checkout-payment";
import CheckoutComplet from "../../components/checkout-complet/checkout-complet";

import "./checkout.scss";

const CheckOutPage = (props) => {
    const currentUser = useSelector(selectCurrentUser);

    const handleRedirectPaymentToSignInPage = () => {
        return currentUser ? <CheckoutPayment /> : <Redirect to="/signin" />
    }

    const handleRedirectCompletToSignInPage = () => {
        return currentUser ? <CheckoutComplet /> : <Redirect to="/signin" />
    }

    return (
        <div className = "checkout-page" >
            <Route exact path = {`${props.match.path}`} component={CheckoutItems} />
            <Route exact path = {`${props.match.path}/payment`} render={handleRedirectPaymentToSignInPage} />
            <Route exact path = {`${props.match.path}/complet`} render={handleRedirectCompletToSignInPage} />
        </div>
    );
}

export default CheckOutPage;