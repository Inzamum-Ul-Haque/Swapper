import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GrAdd } from "react-icons/gr";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const imgHostingKey = process.env.REACT_APP_imgbb_key;
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = (data) => {
    // send the image and get the url from imgbb
    const image = data.productImage[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    setLoadingButton(true);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const productInfo = {
            productName: data.productName,
            productImage: imgData.data.url,
            productCategory: data.productCategory,
            productOriginalPrice: data.productOriginalPrice,
            productResalePrice: data.productResalePrice,
            productOnSale: data.productOnSale,
            productPurchaseYear: data.productPurchaseYear,
            productUsageTime: data.productUsageTime,
            productCondition: data.productCondition,
            productDescription: data.productDescription,
            sellerName: user?.displayName,
            sellerEmail: user?.email,
            sellerLocation: data.sellerLocation,
            sellerNumber: data.sellerNumber,
          };

          // save product info to database
          fetch("http://localhost:5000/product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(productInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.status) {
                toast.success(result.message);
                setLoadingButton(false);
                navigate("/dashboard/my-products");
              } else {
                toast.error(result.message);
                setLoadingButton(false);
              }
            });
        }
      });
  };

  return (
    <div>
      <h1 className="text-4xl text-secondary text-left mt-8 ml-5 mb-5">
        Add a Product
      </h1>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="grid grid-cols-1 gap-y-5 md:w-4/5 sm:w-full border rounded-xl m-5 p-5 text-left"
      >
        <h2 className="text-3xl text-secondary text-left">
          Product Information
        </h2>
        {/* product name */}
        <div className="flex flex-col justify-start w-full">
          <label>
            Name of the Product<span className="text-red-500">*</span>
          </label>
          <input
            {...register("productName", { required: true })}
            className="border rounded-lg p-2 w-full mt-1 text-black"
            type="text"
            placeholder="Type here"
          />
        </div>

        {/* product image */}
        <div className="flex flex-col justify-start w-1/2">
          <label>
            Image of the Product(jpg/jpeg/png)
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register("productImage", { required: true })}
            className="mt-1"
            type="file"
          />
        </div>

        {/* category */}
        <div className="flex flex-col justify-start w-1/2">
          <label>
            Category<span className="text-red-500">*</span>
          </label>
          <select
            defaultValue={"Select category"}
            {...register("productCategory", { required: true })}
            className="border text-black mt-1 rounded-lg p-2 w-full"
          >
            <option value="Select category" disabled>
              Select category
            </option>
            <option value="Asus">Asus</option>
            <option value="Dell">Dell</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Hp">Hp</option>
            <option value="Acer">Acer</option>
            <option value="Msi">Msi</option>
          </select>
        </div>

        {/* prices */}
        <div className="grid gap-y-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-8">
          <div className="flex flex-col justify-start w-full">
            <label>
              Original Price<span className="text-red-500">*</span>
            </label>
            <input
              {...register("productOriginalPrice", { required: true })}
              type="number"
              className="border rounded-lg p-2 mt-1 text-black"
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <label>
              Resale Price<span className="text-red-500">*</span>
            </label>
            <input
              {...register("productResalePrice", { required: true })}
              type="number"
              className="border rounded-lg p-2 mt-1 text-black"
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <label>
              Discount on Sale?<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 my-auto">
              <div className="flex items-center">
                <input
                  {...register("productOnSale", { required: true })}
                  id="sale-option-1"
                  type="radio"
                  value="Yes"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="ml-1 text-black" htmlFor="sale-option-1">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("productOnSale", { required: true })}
                  value="No"
                  id="sale-option-2"
                  type="radio"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="text-black ml-1" htmlFor="sale-option-2">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* purchase year, used, condition */}
        <div className="grid gap-y-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-8">
          <div className="flex flex-col justify-start w-full">
            <label>
              Purchase Year<span className="text-red-500">*</span>
            </label>
            <input
              {...register("productPurchaseYear", { required: true })}
              type="number"
              className="border rounded-lg p-2 mt-1 text-black"
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <label>
              Product used for(in years)<span className="text-red-500">*</span>
            </label>
            <input
              {...register("productUsageTime", { required: true })}
              type="number"
              className="border rounded-lg p-2 mt-1 text-black"
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <label>
              Product Condition<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 my-auto">
              <div className="flex items-center">
                <input
                  {...register("productCondition", { required: true })}
                  id="condition-1"
                  type="radio"
                  value="Good"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="ml-1 text-black" htmlFor="condition-1">
                  Good
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("productCondition", { required: true })}
                  value="Fair"
                  id="condition-2"
                  type="radio"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="text-black ml-1" htmlFor="condition-2">
                  Fair
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("productCondition", { required: true })}
                  value="Excellent"
                  id="condition-3"
                  type="radio"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="text-black ml-1" htmlFor="condition-3">
                  Excellent
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* product details */}
        <div className="flex flex-col justify-start w-full">
          <label>
            Product Description<span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("productDescription", { required: true })}
            placeholder="Description of the product"
            className="border rounded-lg p-2 w-full text-black mt-1 h-40"
          ></textarea>
        </div>

        <h2 className="text-3xl text-secondary text-left">
          Seller Information
        </h2>

        {/* seller name */}
        <div className="grid gap-x-8 gap-y-5 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          <div className="flex flex-col justify-start w-full">
            <label>
              Seller Name<span className="text-red-500">*</span>
            </label>
            <input
              disabled
              defaultValue={user?.displayName}
              className="border rounded-lg p-2 w-full mt-1"
              type="text"
              placeholder="Type here"
            />
          </div>
          <div>
            <label>
              Seller Email<span className="text-red-500">*</span>
            </label>
            <input
              disabled
              defaultValue={user?.email}
              className="border rounded-lg p-2 w-full mt-1"
              type="text"
              placeholder="Type here"
            />
          </div>
        </div>

        {/* location */}
        <div className="w-full flex flex-col justify-start">
          <label>
            Your Location<span className="text-red-500">*</span>
          </label>
          <input
            {...register("sellerLocation", { required: true })}
            className="border rounded-lg p-2 w-full mt-1 text-black"
            type="text"
            placeholder="Type here"
          />
        </div>

        {/* phone number */}

        <div className="w-1/2 flex flex-col justify-start">
          <label>
            Your Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            {...register("sellerNumber", { required: true })}
            className="border rounded-lg p-2 w-full mt-1 text-black"
            type="text"
            placeholder="Type here"
          />
        </div>

        <div className="w-full flex justify-center">
          {loadingButton ? (
            <button
              className="btn inline-flex items-center justify-center mt-3 py-2 font-semibold text-white transition duration-150 ease-in-out bg-green-500 cursor-not-allowed hover:bg-green-700 hover:border-green-700"
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
              Adding...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white hover:bg-green-700 hover:border-green-700 btn mx-auto"
            >
              <GrAdd className="mr-1" /> Add Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
