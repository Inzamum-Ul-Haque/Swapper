import React from "react";
import { GrAdd } from "react-icons/gr";

const AddProduct = () => {
  return (
    <div>
      <h1 className="text-4xl text-secondary text-left mt-8 ml-5 mb-5">
        Add a Product
      </h1>
      <form className="grid grid-cols-1 gap-y-5 md:w-4/5 sm:w-full border rounded-xl m-5 p-5 text-left">
        <h2 className="text-3xl text-secondary text-left">
          Product Information
        </h2>
        {/* product name */}
        <div className="flex flex-col justify-start w-full">
          <label>
            Name of the Product<span className="text-red-500">*</span>
          </label>
          <input
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
          <input className="mt-1" type="file" />
        </div>

        {/* category */}
        <div className="flex flex-col justify-start w-1/2">
          <label>
            Category<span className="text-red-500">*</span>
          </label>
          <select className="border text-black mt-1 rounded-lg p-2 w-full">
            <option selected disabled>
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
              type="number"
              className="border rounded-lg p-2 mt-1 text-black"
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <label>
              Resale Price<span className="text-red-500">*</span>
            </label>
            <input
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
                  id="sale-option-1"
                  type="radio"
                  name="sale"
                  value="Yes"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="ml-1 text-black" htmlFor="sale-option-1">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  value="No"
                  id="sale-option-2"
                  type="radio"
                  name="sale"
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
              Puchase Year<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="border rounded-lg p-2 mt-1 text-black"
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <label>
              Product used for(in years)<span className="text-red-500">*</span>
            </label>
            <input
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
                  id="condition-1"
                  type="radio"
                  name="condition"
                  value="Good"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="ml-1 text-black" htmlFor="condition-1">
                  Good
                </label>
              </div>
              <div className="flex items-center">
                <input
                  value="Fair"
                  id="condition-2"
                  type="radio"
                  name="condition"
                  className="h-4 w-4 border-gray-300 focus:ring-blue-300"
                />
                <label className="text-black ml-1" htmlFor="condition-2">
                  Fair
                </label>
              </div>
              <div className="flex items-center">
                <input
                  value="Excellent"
                  id="condition-3"
                  type="radio"
                  name="condition"
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
            Product Details<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Description of the product"
            className="border rounded-lg p-2 w-full text-black mt-1 h-40"
          ></textarea>
        </div>

        <h2 className="text-3xl text-secondary text-left">
          Seller Information
        </h2>

        {/* seller name */}
        <div className="flex flex-col justify-start w-full">
          <label>
            Seller Name<span className="text-red-500">*</span>
          </label>
          <input
            disabled
            className="border rounded-lg p-2 w-full mt-1"
            type="text"
            placeholder="Type here"
          />
        </div>

        {/* location */}
        <div className="w-full flex flex-col justify-start">
          <label>
            Your Location<span className="text-red-500">*</span>
          </label>
          <input
            className="border rounded-lg p-2 w-full mt-1 text-black"
            type="text"
            placeholder="Type here"
          />
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white hover:bg-green-700 hover:border-green-700 btn mx-auto"
          >
            <GrAdd className="mr-1" /> Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
