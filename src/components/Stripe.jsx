import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Container } from "react-bootstrap";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_live_51QMmnBHdKguquegyMRrvAsafoFw5KsQ1FfBgqqc0ZmfRlT44QzhStsZfzfeaGJ6iBEWTJWr5xRRTb5jT9hIMI4Q700MO1sauyH");

const Stripe = ({ billingData, setCurrentTab }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://yal3d14xdf.execute-api.eu-north-1.amazonaws.com/dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseInt(billingData.total_amount), path: "/create-payment-intent" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';
  return (
    <Container className="custom-payment-container my-3">
      {
        clientSecret ? (
          <Elements stripe={stripePromise} options={{ appearance, loader, clientSecret, redirect: 'if_required' }}>
            <CheckoutForm clientSecret={clientSecret} setCurrentTab={setCurrentTab} billingData={billingData} />
          </Elements>
        ) : (
          <div>Loading...</div>
        )
      }
    </Container>
  );
};

export default Stripe;
