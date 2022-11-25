import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import signup from "../../Assets/lotties/signup.json";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    console.log(data);
  };

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

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-y-5 w-3/4"
          >
            <div className="mt-5">
              <p className="text-black text-lg mb-3">Sign Up as</p>
              <div className="flex items-center">
                <div className="flex items-center mr-5">
                  <input
                    id="country-option-1"
                    type="radio"
                    {...register("userType", {
                      required: "Please select type",
                    })}
                    value="Buyer"
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  />
                  <label
                    htmlFor="country-option-1"
                    className="text-sm font-medium text-gray-900 ml-2 block"
                  >
                    Buyer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="country-option-2"
                    type="radio"
                    {...register("userType", {
                      required: "Please select type",
                    })}
                    value="Seller"
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  />
                  <label
                    htmlFor="country-option-2"
                    className="text-sm font-medium text-gray-900 ml-2 block"
                  >
                    Seller
                  </label>
                </div>
              </div>
              {errors.userType && (
                <p className="text-sm text-red-500">
                  {errors.userType.message}
                </p>
              )}
            </div>
            <input
              className="p-2 rounded-xl border focus:border-primary"
              type="text"
              {...register("name", {
                required: "Please provide your full name",
              })}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 -mt-5">
                {errors.name.message}
              </p>
            )}
            <input
              className="p-2 rounded-xl border focus:border-primary"
              type="email"
              {...register("email", { required: "Please provide your email" })}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 -mt-5">
                {errors.email.message}
              </p>
            )}
            <input
              className="p-2 rounded-xl border focus:border-primary"
              type="password"
              {...register("password", { required: "Please provide password" })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 -mt-5">
                {errors.password.message}
              </p>
            )}
            <input
              className="p-2 rounded-xl border focus:border-primary"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 -mt-5">
                {errors.confirmPassword.message}
              </p>
            )}
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
