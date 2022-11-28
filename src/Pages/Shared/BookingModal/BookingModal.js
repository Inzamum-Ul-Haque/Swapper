import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AuthContext } from "../../../Contexts/AuthProvider";

const BookingModal = ({ productDetails, setProductDetails }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleBookOrder = (data) => {
    const booking = {
      productId: productDetails.productId,
      productImage: productDetails.productImage,
      productName: productDetails.productName,
      productCategory: productDetails.productCategory,
      productResalePrice: productDetails.productResalePrice,
      sellerName: productDetails.sellerName,
      sellerEmail: productDetails.sellerEmail,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyerNumber: data.buyerNumber,
      meetUpLocation: data.meetUpLocation,
      orderTime: new Date().toString(),
    };

    setLoading(true);
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          setLoading(false);
          setProductDetails(null);
          toast.success(result.message);
        } else {
          setLoading(false);
          toast.error(result.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative text-left">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm bg-secondary text-white btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold">
            Book Order to Purchase {productDetails?.productName}
          </h3>
          <form onSubmit={handleSubmit(handleBookOrder)}>
            <div className="w-full flex flex-col justify-start mb-4">
              <label>Buyer Name</label>
              <input
                defaultValue={user?.displayName}
                disabled
                className="border rounded-lg p-2 w-full mt-1 text-black"
                type="text"
                placeholder="Type here"
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-x-2 mb-4">
              <div className="flex flex-col justify-start">
                <label>Buyer Email</label>
                <input
                  defaultValue={user?.email}
                  disabled
                  className="border rounded-lg p-2 w-full mt-1 text-black"
                  type="email"
                  placeholder="Type here"
                />
              </div>
              <div className="flex flex-col justify-start">
                <label>Buyer Phone Number</label>
                <input
                  {...register("buyerNumber", { required: true })}
                  className="border rounded-lg p-2 w-full mt-1 text-black"
                  type="text"
                  placeholder="Type here"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-start mb-4">
              <label>Meet-up Location</label>
              <input
                {...register("meetUpLocation", { required: true })}
                className="border rounded-lg p-2 w-full mt-1 text-black"
                type="text"
                placeholder="Type here"
              />
            </div>
            <div className="flex justify-center">
              {loading ? (
                <button
                  className="btn mt-3 py-2 font-semibold text-white transition duration-150 ease-in-out bg-green-500 cursor-not-allowed hover:bg-green-700 hover:border-green-700 w-max text-sm"
                  disabled=""
                >
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
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
                  Processing...
                </button>
              ) : user ? (
                <button
                  className="btn w-max bg-green-500 text-sm text-white hover:bg-green-700 hover:border-green-700"
                  type="submit"
                >
                  Book Order{" "}
                  <MdProductionQuantityLimits className="ml-2 text-lg" />
                </button>
              ) : (
                <p className="text-lg">
                  Please <span>Sign In</span> to book this product!
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
