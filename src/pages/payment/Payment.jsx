import React, { useEffect, useState } from "react";
import "./Payment.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import request from "../../utils/request";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Mwlf6KQPjPsiW7mZSGlxtSGNbmEvoZw69Wm1nn1VokVRmCU9D0QxG8P5LQ2ue5dujTsHRQAlRNaK4arEYWghnp000BSUHgnmr"
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const newRequest = async () => {
      try {
        const res = await request.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    newRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
