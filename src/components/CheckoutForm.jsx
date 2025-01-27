import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ setCurrentTab, billingData, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // const {paymentIntent, error} = await stripe.confirmPayment({ 
    //   elements,
    //   redirect: "if_required"
    // });

    const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret,{ 
      payment_method: {
        card: elements.getElement(PaymentElement),
        billing_details: {
        name: localStorage.getItem('user_email'),
        },
      },
    });

    // const paymentIntent = {
    //     "id": "pi_3Nlr7B2eZvKYlo2C1XN5YseQ",
    //     "object": "payment_intent",
    //     "amount": 5000,
    //     "canceled_at": null,
    //     "cancellation_reason": null,
    //     "capture_method": "automatic",
    //     "client_secret": "pi_3Nlr7B2eZvKYlo2C1XN5YseQ_secret_L8GHjklmq9jKpZ",
    //     "confirmation_method": "automatic",
    //     "created": 1695065177,
    //     "currency": "usd",
    //     "description": "Payment for order #12345",
    //     "last_payment_error": null,
    //     "livemode": false,
    //     "metadata": {},
    //     "next_action": null,
    //     "payment_method": "pm_1Nlr7A2eZvKYlo2ChJEkxkZr",
    //     "receipt_email": "customer@example.com",
    //     "status": "succeeded"
    //   }
      

    setIsLoading(false);    

    if (error) {
      setMessage(error.message);
    } else {
        const storePaymentDetailsRes = await fetch('https://yal3d14xdf.execute-api.eu-north-1.amazonaws.com/dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({paymentIntent, user_email: localStorage.getItem('user_email'), billingData, path: "/store-payment-details"})
        });
        await storePaymentDetailsRes.json();
        setCurrentTab('payment-success');
    }

  };

  const paymentElementOptions = {
    layout: "accordion"
  }

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        {/* <CardElement id="payment-element" options={paymentElementOptions} /> */}
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}