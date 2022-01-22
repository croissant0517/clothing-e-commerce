import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Spinner } from "../with-spinner/with-spinner"; 

import CheckoutForm from "./CheckoutForm";

import "./stripe-pay-form.scss";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51JjUcqGBBygI9WOWYOMqL4LtNeKUZnno4QsffQjvPXztVhIT14xCqoGPBA0d4LGxEzagVYPEsVNxyWfv9jU9ROgc00QM8w0obm");

export default function StripePayPage(props) {
    const { clientSecret } = props

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="stripe-pay" >
            {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm shipping={props.shipping}/>
                <div className = "test-warning">
                    *Please use the following test credit card for payment*
                    <br/>
                    4242-4242-4242-4242 - 01/23 - CVV : 123               
                </div>
            </Elements>
            ) : <Spinner/>}
        </div>
    );
}