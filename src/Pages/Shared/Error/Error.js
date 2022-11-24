import React from "react";
import error from "../../../Assets/lotties/404-error.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

const Error = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="text-secondary flex flex-col items-center justify-center min-h-screen">
      <Lottie options={defaultOptions} height={480} width={480} />
      <h2 className="text-2xl">Looks like this page doesn't exist!</h2>
      <Link to="/">
        <button className="btn py-2 bg-green-500 text-white hover:bg-green-700 hover:border-green-700 mt-3">
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
