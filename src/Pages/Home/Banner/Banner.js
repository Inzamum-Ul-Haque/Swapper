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
    <div className="border border-purple-900 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center">
      <div>
        <h2>Buy and Sell Second-hand Laptops</h2>
        <p>
          Browse the categories section to find your desired laptops. You can
          book a product and set up a meeting with the seller to buy product.
        </p>
      </div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Banner;
