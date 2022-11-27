import React from "react";

const ViewDetailsModal = ({ productDetails }) => {
  const {
    productName,
    productImage,
    productOriginalPrice,
    productResalePrice,
    productPurchaseYear,
    productUsageTime,
    productCondition,
    productDescription,
    sellerName,
    sellerEmail,
    sellerLocation,
    sellerNumber,
  } = productDetails;
  return (
    <div>
      <input type="checkbox" id="view-details-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative text-left">
          <label
            htmlFor="view-details-modal"
            className="btn btn-sm bg-secondary text-white btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-3xl font-bold">Product Information</h3>
          <img src={productImage} alt="" />
          <h3 className="text-lg font-bold">{productName}</h3>
          <div className="justify-between items-center text-base font-bold text-black">
            <p className="pt-2 flex ">
              Original Price: Tk {productOriginalPrice}
            </p>
            <p className="pt-2 flex ">Resale Price: Tk {productResalePrice}</p>
            <p className="pt-2 flex ">Purchase Year: {productPurchaseYear}</p>
            <p className="pt-2 flex ">Used for: {productUsageTime} Years</p>

            <p className="pt-2 text-base font-bold">
              Condition: {productCondition}
            </p>
            <div className="pt-2">
              <h3 className="text-xl font-bold text-secondary">Details</h3>
              <p className="text-base font-normal">{productDescription}</p>
            </div>
          </div>

          <h3 className="text-3xl font-bold pt-4 text-secondary">
            Seller Information
          </h3>
          <div className="text-base text-black">
            <p>Seller Name: {sellerName}</p>
            <p>Seller Number: {sellerNumber}</p>
            <p>Seller Location: {sellerLocation}</p>
            <p>Seller Email: {sellerEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
