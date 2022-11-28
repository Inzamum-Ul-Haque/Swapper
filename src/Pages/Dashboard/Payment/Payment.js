import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = ({ bookingData, setBookingData, handlePayment }) => {
  return (
    <div>
      <input type="checkbox" id="payment-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative text-left p-5">
          <label
            htmlFor="payment-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-xl font-bold">
            Payment for {bookingData.productName}
          </h3>
          <p>Product Id: {bookingData.productId}</p>
          <p>
            Please pay: <b>Tk {bookingData.productResalePrice}</b>
          </p>
          <div className="mt-5 border p-5">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                setBookingData={setBookingData}
                bookingData={bookingData}
                handlePayment={handlePayment}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
