import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentStatus from "../payment-status/payment-status";
import stripeLogo from '../../assets/Stripe wordmark - blurple.svg';

import "./checkout-complet.scss"

const stripePromise = loadStripe("pk_test_51JjUcqGBBygI9WOWYOMqL4LtNeKUZnno4QsffQjvPXztVhIT14xCqoGPBA0d4LGxEzagVYPEsVNxyWfv9jU9ROgc00QM8w0obm");

const CheckoutComplet = () => {

    return (
        <div className="payment-complet" >
            <div className="payment-complet-result" >
                <img src={stripeLogo} className="stripe-logo" alt="stripe-logo" />
                <Elements  stripe={stripePromise}>
                    <PaymentStatus />
                </Elements>
            </div>
        </div>   
    );
}

export default CheckoutComplet;