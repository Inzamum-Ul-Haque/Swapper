import React from "react";
import Lottie from "react-lottie";
import banner from "../../../Assets/lotties/banner";

const Banner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: banner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center">
      <div className="text-left text-secondary p-8">
        <h2 className="text-5xl">
          Buy and Sell Second-hand <span className="text-primary">Laptops</span>
        </h2>
        <p className="text-xl mt-3">
          Browse the <span className="text-green-500">categories</span> section
          to find your desired laptops. You can book a product and set up a
          meeting with the seller to buy product.
        </p>
        <button className="bg-green-500 text-white hover:bg-green-700 hover:border-green-700 mt-3 btn">
          Find Categories
        </button>
      </div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Banner;
