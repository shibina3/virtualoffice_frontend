import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Container } from "react-bootstrap";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");

const Stripe = ({ billingData, setCurrentTab }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
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
