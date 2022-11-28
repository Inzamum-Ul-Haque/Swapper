import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import ViewDetailsModal from "../../Shared/ViewDetailsModal/ViewDetailsModal";
import sale from "../../../Assets/gifs/icons8-sale.gif";
import {
  MdDelete,
  MdProductionQuantityLimits,
  MdVerified,
} from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import BookingModal from "../../Shared/BookingModal/BookingModal";
import toast from "react-hot-toast";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState(null);
  const {
    data: wishList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/wishlist?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { data } = wishList;

  const handleDeleteFromWishlist = (productId) => {
    const loadingToast = toast.loading("Processing...");
    fetch(
      `http://localhost:5000/wishlist?email=${user?.email}&productId=${productId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success(result.message);
          toast.remove(loadingToast);
          refetch();
        } else {
          toast.error(result.message);
          toast.remove(loadingToast);
        }
      });
  };

  return (
    <div>
      {data.length === 0 ? (
        <h1 className="text-4xl text-center mt-16 text-gray-600">
          You have no wishlist item
        </h1>
      ) : (
        <>
          <h1 className="text-4xl text-secondary text-left mt-8 ml-5 mb-5">
            My Wishlist
          </h1>
          <div className="mt-5 ml-5">
            {data.map((product) => (
              <div
                key={product._id}
                className="p-5 flex flex-col mb-5 w-full md:flex-row border relative rounded-lg bg-white shadow-lg"
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
                      Original Price: Tk {product.productOriginalPrice}
                    </p>
                    <p className="text-lg mr-10">
                      Regular Price: Tk {product.productResalePrice}
                    </p>
                    <p className="text-lg">
                      Category: <b>{product.productCategory}</b>
                    </p>
                  </div>
                  <p className="text-gray-700 text-base mb-4">
                    {product.productDescription.length < 200
                      ? product.productDescription
                      : product.productDescription.slice(0, 300) + " ..."}
                  </p>
                  <div className="flex lg:flex-row md:flex-row sm:flex-col lg:justify-end md:justify-center items-center">
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
                    <button
                      onClick={() =>
                        handleDeleteFromWishlist(product.productId)
                      }
                      className="btn w-max bg-red-500 text-sm text-white hover:bg-red-700 hover:border-red-700 mb-4 ml-4"
                    >
                      Delete from Wishlist <MdDelete className="ml-2 text-lg" />
                    </button>
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

export default MyWishlist;
