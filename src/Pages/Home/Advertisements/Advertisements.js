import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import sale from "../../../Assets/lotties/sale.json";
import React, { useContext, useState } from "react";
import { MdVerified } from "react-icons/md";
import { AuthContext } from "../../../Contexts/AuthProvider";
import BookingModal from "../../Shared/BookingModal/BookingModal";
import Loading from "../../Shared/Loading/Loading";
import ViewDetailsModal from "../../Shared/ViewDetailsModal/ViewDetailsModal";
import LottieAnim from "../../Utils/LottieAnim";

const Advertisements = () => {
  const { user } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState(null);
  const { data: advertisements = [], isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/advertise");
      return res.data;
    },
  });

  const { data: userData = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/user?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { data } = advertisements;

  return (
    <div className="mt-20 text-secondary">
      {data.length === 0 ? (
        <></>
      ) : (
        <>
          <h2 className="lg:text-left md:text-center text-4xl sm:text-center">
            Advertisements
          </h2>
          <div className="mt-8 grid justify-items-center gap-y-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {data.map((singleData) => (
              <div
                key={singleData._id}
                className="card w-72 bg-base-100 shadow-xl relative"
              >
                {singleData?.productOnSale === "Yes" ? (
                  <div className="absolute -right-1 top-1">
                    <LottieAnim data={sale} height={80} width={80} />
                  </div>
                ) : (
                  <></>
                )}
                <figure className="px-5 pt-5">
                  <img
                    src={singleData?.productImage}
                    alt=""
                    className="rounded-md mt-4"
                  />
                </figure>
                <div className="card-body text-left">
                  <h2 className="card-title text-lg">
                    {singleData?.productName}
                  </h2>
                  <p className="text-sm">
                    Location: {singleData?.sellerLocation}
                  </p>
                  <p className="text-sm">
                    Resale price: Tk {singleData?.productResalePrice}
                  </p>
                  <p className="text-sm">
                    Original price: Tk {singleData?.productOriginalPrice}
                  </p>
                  <p className="text-sm">
                    Years used: {singleData?.productUsageTime}
                  </p>
                  <p className="text-sm">
                    Product condition: {singleData?.productCondition}
                  </p>
                  <p className="text-sm">
                    <span className="flex items-center">
                      Seller: {singleData?.sellerName}
                      {singleData?.sellerVerified ? (
                        <MdVerified className="ml-1 text-primary" />
                      ) : (
                        <></>
                      )}
                    </span>
                  </p>
                  <div className="flex items-center justify-center mt-4">
                    {userData?.data?.userType === "Buyer" && (
                      <button className="btn btn-sm text-sm bg-green-500 text-white hover:bg-green-700 hover:border-green-700">
                        <label
                          onClick={() => setProductDetails(singleData)}
                          htmlFor="booking-modal"
                        >
                          Book Now
                        </label>
                      </button>
                    )}
                    <button className="btn btn-sm text-sm bg-primary text-white hover:bg-primary hover:border-primary">
                      <label
                        onClick={() => setProductDetails(singleData)}
                        htmlFor="view-details-modal"
                      >
                        View Details
                      </label>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {productDetails && (
            <ViewDetailsModal productDetails={productDetails} />
          )}
          {productDetails && (
            <BookingModal
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Advertisements;
