import React from "react";
import signin from "../../Assets/lotties/signin.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signin,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center text-secondary">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-center py-5 shadow-xl">
        <div className="text-left flex flex-col items-center justify-center py-5">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="text-lg mt-3">
            Don't have an account?{" "}
            <Link className="text-green-500" to="/sign-up">
              Sign Up
            </Link>{" "}
            now!
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
            <button className="py-2 bg-green-500 text-white hover:bg-green-700 hover:border-green-700 mt-3 btn">
              Login
            </button>
          </form>

          <div className="mt-8 grid grid-cols-3 items-center text-gray-600 w-3/4">
            <hr className="text-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="text-gray-400" />
          </div>

          <button className="bg-white border py-2 rounded-xl mt-5 flex justify-center items-center w-3/4 hover:shadow-sm hover:shadow-gray-600">
            <FcGoogle className="mr-3" />{" "}
            <span className="text-sm">Login with Google</span>
          </button>
        </div>
        <div>
          <Lottie options={defaultOptions} height={480} width={480} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
