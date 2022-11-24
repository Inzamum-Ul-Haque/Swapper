import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import signup from "../../Assets/lotties/signup.json";

const SignUp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signup,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center text-secondary">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-center py-5 shadow-xl">
        <div className="text-left flex flex-col items-center justify-center py-5 sm:order-last">
          <h2 className="text-3xl font-bold">Sign Up</h2>
          <p className="text-lg mt-3">
            Already have an account?{" "}
            <Link className="text-green-500" to="/sign-in">
              Sign In
            </Link>{" "}
          </p>

          <form className="flex flex-col gap-y-5 w-3/4">
            <input
              className="p-2 mt-8 rounded-xl border focus:border-primary"
              type="email"
              placeholder="Email"
            />
            <input
              className="p-2 rounded-xl border focus:border-primary"
              type="password"
              placeholder="Password"
            />
            <input
              className="p-2 rounded-xl border focus:border-primary"
              type="password"
              placeholder="Confirm password"
            />
            <button className="py-2 bg-green-500 text-white hover:bg-green-700 hover:border-green-700 mt-3 btn">
              Sign Up
            </button>
          </form>
        </div>
        <div>
          <Lottie options={defaultOptions} height={480} width={480} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
