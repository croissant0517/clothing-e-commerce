import {useState, useEffect} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cart/cart.action';

import "./payment-status.scss";

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const [paymentIntentDetail, setPaymentIntentDetail] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js

    const paymentIntentclientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
    );
    
    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(paymentIntentclientSecret)
      .then((data) => {
          const {paymentIntent} = data
          console.log(data);
          setPaymentIntentDetail(paymentIntent);
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent.status) {
          case 'succeeded':
            dispatch(clearCart());
            setMessage('Success! Payment received.');
            setResultMessage("Your order has been placed. We'll send you an email with your order details.");
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            setResultMessage("Hold tight, your order is being processed. We will email you when your order succeeds");
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage('Payment failed. Please try another payment method.');
            break;

          default:
            setMessage('Something went wrong.');
            setResultMessage("We are sorry, there was an error processing your patment. Please try again a different payment method.");
            break;
        }
    });
}, [stripe, dispatch]);


    return (
        <div className='payment-status' >
            <h3 className='payment-status-message' >{message}</h3>
            <h3 className='payment-status-resultMessage' >{resultMessage}</h3>
            <div className='payment-charge' >
              <h3>SUMMARY</h3>
              <div>
                <div className='payment-charge-detail1' >
                  <span>Payment to OVERFIT</span>
                  <span>${(paymentIntentDetail.amount/100).toFixed(2)}</span>
                </div>
                <div className='payment-charge-detail2' >
                  <span>Amount charged</span>
                  <span>${(paymentIntentDetail.amount/100).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className='contact-information'>
              <span>If you have any questions, contact us at <a href='mailto: wathyic@gmail.com' >wathyic@gmail.com</a> or call at <a href='tel:+886 912 923 353'>+886 912 923 353</a>.</span>
            </div>
        </div>
    );
};

export default PaymentStatus;