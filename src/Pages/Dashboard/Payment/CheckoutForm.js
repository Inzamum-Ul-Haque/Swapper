import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMoneyCheck } from "react-icons/fa";
import { AuthContext } from "../../../Contexts/AuthProvider";

const CheckoutForm = ({ bookingData, setBookingData, handlePayment }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const { productResalePrice, buyerName, buyerEmail } = bookingData;
  const [clientSecret, setClientSecret] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        // authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ productResalePrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [productResalePrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    setLoadingButton(true);
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

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: buyerName,
            email: buyerEmail,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setLoadingButton(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        transactionId: paymentIntent.id,
        paid: true,
      };

      fetch(
        `http://localhost:5000/booking?email=${user?.email}&id=${bookingData.productId}`,
        {
          method: "PATCH",

          headers: {
            "content-type": "application/json",
            // verify jwt here
          },
          body: JSON.stringify(payment),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.status) {
            handlePayment();
            setLoadingButton(false);
            setBookingData(null);
            toast.success(result.message);
          } else {
            setLoadingButton(false);
            toast.error(result.message);
          }
        });
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
        {loadingButton ? (
          <button
            className="btn btn-md mt-2 w-max bg-green-500 text-sm text-white hover:bg-green-700 hover:border-green-700"
            disabled={!stripe || !clientSecret}
          >
            Processing...{" "}
            <svg
              className="w-5 h-5 mr-3 ml-2 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        ) : (
          <button
            className="btn btn-md mt-2 w-max bg-green-500 text-sm text-white hover:bg-green-700 hover:border-green-700"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Confirm Payment <FaMoneyCheck className="ml-2" />
          </button>
        )}
      </form>
      <p className="text-red-500">{cardError}</p>
    </>
  );
};

export default CheckoutForm;
