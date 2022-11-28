import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  MdOutlineNoteAdd,
  MdProductionQuantityLimits,
  MdVerified,
} from "react-icons/md";
import sale from "../../Assets/gifs/icons8-sale.gif";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import Loading from "../Shared/Loading/Loading";
import ViewDetailsModal from "../Shared/ViewDetailsModal/ViewDetailsModal";
import BookingModal from "../Shared/BookingModal/BookingModal";

const ProductsByCategories = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState(null);

  const url = `http://localhost:5000/user?email=${user?.email}`;
  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axios.get(url);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-20 text-secondary">
      {data?.data.length === 0 ? (
        <h1 className="text-4xl text-center mt-16 text-gray-600">
          No products to show
        </h1>
      ) : (
        <>
          <h2 className="text-left text-4xl">Category: {data.category}</h2>
          <div className="mt-5">
            {data?.data.map((product) => (
              <div
                key={product._id}
                className="flex flex-col p-5 mb-5 w-full md:flex-row border rounded-lg bg-white shadow-lg relative"
              >
                {product.productOnSale === "Yes" && (
                  <img
                    src={sale}
                    className="w-12 absolute right-5 top-5"
                    alt=""
                  />
                )}
                <img
                  className="lg:w-64 md:w-64 sm:w-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={product.productImage}
                  alt=""
                />
                <div className="p-5 flex flex-col justify-start text-left">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    {product.productName}
                  </h5>
                  <div className="flex mb-2">
                    <p className="text-lg mr-10">
                      Original Price: <b>Tk {product.productOriginalPrice}</b>
                    </p>
                    <p className="text-lg mr-10">
                      Regular Price: <b>Tk {product.productResalePrice}</b>
                    </p>
                    <p className="text-lg mr-10">
                      Category: <b>{product.productCategory}</b>
                    </p>
                    <p className="text-lg">
                      Used for: <b>{product.productUsageTime} Years</b>
                    </p>
                  </div>
                  <p className="text-gray-700 text-base mb-4">
                    {product.productDescription.length < 200
                      ? product.productDescription
                      : product.productDescription.slice(0, 300) + " ..."}
                  </p>
                  <div className="flex lg:flex-row md:flex-row sm:flex-col lg:justify-end md:justify-center items-center">
                    {userData?.data?.userType === "Buyer" && (
                      <button className="flex items-center btn w-max bg-yellow-500 text-sm text-white hover:bg-yellow-600 hover:border-yellow-600 mb-4 ml-4">
                        Add to Wishlist{" "}
                        <MdOutlineNoteAdd className="ml-2 text-lg" />
                      </button>
                    )}

                    {(userData?.data?.userType === "Buyer" ||
                      userData?.data?.userType === "Seller" ||
                      userData?.data?.userType === "Admin") && (
                      <button className="btn w-max bg-primary text-sm text-white hover:bg-primary hover:border-primary mb-4 ml-4">
                        <label
                          onClick={() => setProductDetails(product)}
                          htmlFor="view-details-modal"
                          className="flex items-center"
                        >
                          View Details{" "}
                          <AiOutlineInfoCircle className="ml-2 text-lg" />
                        </label>
                      </button>
                    )}

                    {userData?.data?.userType === "Buyer" && (
                      <button className="btn w-max bg-green-500 text-sm text-white hover:bg-green-700 hover:border-green-700 mb-4 ml-4">
                        <label
                          onClick={() => setProductDetails(product)}
                          htmlFor="booking-modal"
                          className="flex items-center "
                        >
                          Book Now{" "}
                          <MdProductionQuantityLimits className="ml-2 text-lg" />
                        </label>
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Location: {product.sellerLocation}
                  </p>
                  <p className="text-gray-600 text-sm flex">
                    <span className="mr-10">
                      Posted on: {product?.productPostTime?.slice(0, 24)}
                    </span>{" "}
                    <span className="flex items-center">
                      by {product.sellerName}{" "}
                      {product?.sellerVerified && (
                        <MdVerified className="text-primary ml-1" />
                      )}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {productDetails && <ViewDetailsModal productDetails={productDetails} />}
      {productDetails && (
        <BookingModal
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
      )}
    </div>
  );
};

export default ProductsByCategories;
