import {useState, useEffect, useCallback} from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { clearCart } from '../../redux/cart/cart.action';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { firestore } from '../../firebase/firebase.utils';

import "./payment-status.scss";

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const [paymentIntentDetail, setPaymentIntentDetail] = useState({});
  const [shippingDetail, setShippingDetail] = useState({});
  const [addressDetail, setAddressDetail] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [orderCompletTime, setOrderCompletTime] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems, shallowEqual);

  const handleAddOrderToFirestore = 
    useCallback((paymentIntent) => {
      const orderRef = firestore.doc(`orders/${paymentIntent.id}`)
      orderRef.get().then((snapShot) => {
        if(snapShot.exists === false) {
          const date = handleGetTime()
          orderRef.set({
            id: paymentIntent.id,
            orderCreatedTime: date,
            state: paymentIntent.status,
            email: paymentIntent.receipt_email,
            amount: paymentIntent.amount,
            detail: {
              shipping: paymentIntent.shipping.address,
              name: paymentIntent.shipping.name,
              orderItems: cartItems,
              paymentMethodTypes: paymentIntent.payment_method_types[0],
            }
          }).then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
        } else if (snapShot.exists === true){
          setOrderItems(snapShot.data().detail.orderItems);
          setOrderCompletTime(snapShot.data().orderCreatedTime);
        }
      })
    }, [cartItems])

  const handleGetTime = () => {
    const mounthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const date = new Date();
    const year = date.getFullYear().toString();
    const mounth = mounthArray[date.getMonth()];
    let day;
    if (date.getDate() < 10) {
      day = "0"+date.getDate().toString()
    } else {
      day = date.getDate()
    }
    const fullTime = year+mounth+day
    return fullTime
  }

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
          setPaymentIntentDetail(paymentIntent);
          setShippingDetail(paymentIntent.shipping);
          setAddressDetail(paymentIntent.shipping.address);
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent.status) {
          case 'succeeded':
            handleAddOrderToFirestore(paymentIntent);
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
}, [stripe, dispatch, handleAddOrderToFirestore]);


    return (
        <div className='payment-status' >
            <h3 className='payment-status-message' >{message}</h3>
            <h3 className='payment-status-resultMessage' >{resultMessage}</h3>
            <div className='order-complet-time'>
              <span>Date : {orderCompletTime}</span>
            </div>
            <div className='shipping-info' >
              <h3>Shipping Info</h3>
              <div>
                <div className='payment-charge-detail2' >
                  <span>Address</span>
                  <span>{addressDetail.postal_code}{addressDetail.country} {addressDetail.city} {addressDetail.line1}</span>
                </div>
                <div className='payment-charge-detail2' >
                  <span>Recipient Name</span>
                  <span>{shippingDetail.name}</span>
                </div>
              </div>
            </div>
            <div className='payment-charge' >
              <h3>Charge</h3>
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
            <div className='order-detail' >
              <h3>Order Details</h3>
              <div className='order-detail-container' >
                <div className='order-detail-header' >
                  <div className='order-detail-header-option' >
                    <span>Product</span>
                  </div>
                  <div className='order-detail-header-option' >
                    <span>Description</span>
                  </div>
                  <div className='order-detail-header-option' >
                    <span>Quantity</span>
                  </div>
                  <div className='order-detail-header-option' >
                    <span>Price</span>
                  </div>
                </div>
                <div className='order-detail-items' >
                  {
                    orderItems.map((item) => (
                      <div key={item.id} className='order-detail-item' >
                        <div className='order-detail-item-content' >
                          <div className='order-detail-item-img' style = {{backgroundImage: `url(${ item.imageUrl })`}} ></div>
                        </div>
                        <div className='order-detail-item-content' >
                          <span>{item.name}</span>
                        </div>
                        <div className='order-detail-item-content' >
                          <span>{item.quantity}</span>
                        </div>
                        <div className='order-detail-item-content' >
                          <span>${item.price}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className='contact-information'>
              <span>
                If you have any questions, contact us at
                <a href=' mailto: wathyic@gmail.com' >
                  wathyic@gmail.com
                </a> or call at 
                <a href='tel:+886 912 923 353'>
                  +886 912 923 353
                </a>.</span>
            </div>
        </div>
    );
};

export default PaymentStatus;