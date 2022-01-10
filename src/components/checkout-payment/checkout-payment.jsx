import React, {useState, useRef} from "react";

import { useSelector } from 'react-redux';

import CustomButton from "../../components/custom-button/custom-button";
import StripePayPage from "../../components/stripe-pay-form/stripe-pay-form";
import FormInput from "../../components/form-input/form-input";

import { selectCartTotal } from "../../redux/cart/cart.selectors";

import axios from "axios";

import "./checkout-payment.scss";

const CheckoutPayment = () => {
    const myRef = useRef()
    const [clientSecret, setClientSecret] = useState("");
    const [shipping, setShipping] = useState({
        address: {
            city: "",
            country: "",
            line1:"",
            postal_code: ""
        },
        name: ""
    });
    const total = useSelector(selectCartTotal);

    const handleGoPayButtonOnClick = () => {
        axios({
            method: "POST",
            url: 'https://floating-lowlands-20171.herokuapp.com/create-payment-intent',
            headers: { "Content-Type": "application/json" },
            data: {
                total: total*100
            },
        })
            .then(json => {
                setClientSecret(json.data.clientSecret);
                console.log(json);
            })
            .catch((error) => console.log(error));
        
    }

    const executeScroll = () => myRef.current.scrollIntoView() 

    const handleShippingDetailConfirm = (event) => {
        event.preventDefault();
        handleGoPayButtonOnClick();
        executeScroll();
    }

    return (
        <div className="checkout-payment" >
            <form className="shipping-detail" onSubmit = {handleShippingDetailConfirm}>
                <h2 className="shipping-detail-title" >Shipping</h2>
                <FormInput
                    type="city"
                    value={shipping.address.city}
                    handleChange={(e) => 
                        setShipping({ ...shipping, address: { ...shipping.address, city: e.target.value}})}
                    placeholder="City"
                    required
                    autoComplete="on"
                />
                <FormInput
                    type="country"
                    value={shipping.address.country}
                    handleChange={(e) => 
                        setShipping({ ...shipping, address: { ...shipping.address, country: e.target.value}})}
                    placeholder="Country"
                    required
                    autoComplete="on"
                />
                <FormInput
                    type="line1"
                    value={shipping.address.line1}
                    handleChange={(e) => 
                        setShipping({ ...shipping, address: { ...shipping.address, line1: e.target.value}})}
                    placeholder="Line1"
                    required
                    autoComplete="on"
                />
                <FormInput
                    type="postal_code"
                    value={shipping.address.postal_code}
                    handleChange={(e) => 
                        setShipping({ ...shipping, address: { ...shipping.address, postal_code: e.target.value}})}
                    placeholder="Postal code"
                    required
                    autoComplete="on"
                />
                <FormInput
                    type="name"
                    value={shipping.name}
                    handleChange={(e) =>
                        setShipping({ ...shipping, name: e.target.value})
                    }
                    placeholder="Enter recipient name"
                    required
                    autoComplete="on"
                />
            <div className = "total" >
                <div className = "subtotal-title" >
                    <span>Total : </span>
                    <span>Delivery charges : </span>
                    <span>Subtotal : </span>
                </div>
                <div className = "subtotal-charge" >
                    <span>${total}</span>
                    <span>$0</span>
                    <span>${total}</span>
                </div>
            </div>
                <CustomButton type="submit">Confirm and Go Pay</CustomButton>
            </form>
            <div ref={myRef} className = "stripe-checkoutForm">
                <StripePayPage clientSecret={clientSecret} shipping={shipping}/>
            </div>
        </div>
    );
}

export default CheckoutPayment;