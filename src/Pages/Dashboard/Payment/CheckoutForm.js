import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { FaMoneyCheck } from "react-icons/fa";

const CheckoutForm = ({ bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const { productResalePrice } = bookingData;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-md mt-2 w-max bg-green-500 text-sm text-white hover:bg-green-700 hover:border-green-700"
          type="submit"
          disabled={!stripe}
        >
          Confirm Payment <FaMoneyCheck className="ml-2" />
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </>
  );
};

export default CheckoutForm;
