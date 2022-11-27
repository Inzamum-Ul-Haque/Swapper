import React, { useContext, useState } from "react";
import { AiFillSound, AiOutlineInfoCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import ViewDetailsModal from "../../Shared/ViewDetailsModal/ViewDetailsModal";
import sale from "../../../Assets/gifs/icons8-sale.gif";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/products?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { data } = allProducts;

  const closeModal = () => {
    setDeletingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    const loadingToast = toast.loading("Deleting buyer...");
    fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    })
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

  const handleAdvertiseProduct = (product) => {
    const advertiseItem = {
      productId: product._id,
      productName: product.productName,
      productImage: product.productImage,
      productCategory: product.productCategory,
      productOriginalPrice: product.productOriginalPrice,
      productResalePrice: product.productResalePrice,
      productOnSale: product.productOnSale,
      productPurchaseYear: product.productPurchaseYear,
      productUsageTime: product.productUsageTime,
      productCondition: product.productCondition,
      productDescription: product.productDescription,
      productPostTime: product.productPostTime,
      sellerName: product.sellerName,
      sellerEmail: product.sellerEmail,
      sellerLocation: product.sellerLocation,
      sellerNumber: product.sellerNumber,
    };

    const loadingToast = toast.loading("Processing...");
    fetch("http://localhost:5000/advertise", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(advertiseItem),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success(result.message);
          toast.remove(loadingToast);
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
          No products to show
        </h1>
      ) : (
        <>
          <h1 className="text-4xl text-secondary text-left mt-8 ml-5 mb-5">
            My Products
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
                    <button
                      onClick={() => handleAdvertiseProduct(product)}
                      className="flex items-center btn w-max bg-green-500 text-sm text-white hover:bg-green-700 hover:border-green-700 mb-4"
                    >
                      Advertise <AiFillSound className="ml-2 text-lg" />
                    </button>
                    <button
                      // onClick={() => handleDeleteProduct(product._id)}
                      className="btn w-max bg-red-500 text-sm text-white hover:bg-red-700 hover:border-red-700 mb-4 ml-4"
                    >
                      <label
                        className="flex items-center"
                        onClick={() => setDeletingProduct(product)}
                        htmlFor="confirmation-modal"
                      >
                        Delete this product{" "}
                        <MdDelete className="ml-2 text-lg" />
                      </label>
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
                    Posted on: {product?.productPostTime?.slice(0, 24)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {productDetails && <ViewDetailsModal productDetails={productDetails} />}
      {deletingProduct && (
        <ConfirmationModal
          title={"Are you sure want to delete?"}
          message={"If you delete this item, it cant be undone!"}
          closeModal={closeModal}
          modalData={deletingProduct._id}
          successAction={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default MyProducts;
