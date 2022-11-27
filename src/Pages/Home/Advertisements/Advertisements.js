import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import sale from "../../../Assets/gifs/icons8-sale.gif";
import Loading from "../../Shared/Loading/Loading";

const Advertisements = () => {
  const { data: advertisements = [], isLoading } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/advertise");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { data } = advertisements;

  return (
    <div className="mt-20 text-secondary">
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
              <img src={sale} className="w-12 absolute right-5 top-5" alt="" />
            ) : (
              <></>
            )}
            <figure className="px-5 pt-5">
              <img
                src={singleData?.productImage}
                alt=""
                className="rounded-md"
              />
            </figure>
            <div className="card-body text-left">
              <h2 className="card-title text-lg">{singleData?.productName}</h2>
              <p>Location: {singleData?.sellerLocation}</p>
              <p>Resale price: Tk {singleData?.productResalePrice}</p>
              <p>Original price: Tk {singleData?.productOriginalPrice}</p>
              <p>Years used: {singleData?.productUsageTime}</p>
              <p>Product condition: {singleData?.productCondition}</p>
              <div className="flex items-center justify-between mt-4">
                <button className="btn btn-sm text-sm bg-green-500 text-white hover:bg-green-700 hover:border-green-700">
                  Book Now
                </button>
                <button className="btn btn-sm text-sm bg-primary text-white hover:bg-primary hover:border-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
