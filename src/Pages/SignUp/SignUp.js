import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import signup from "../../Assets/lotties/signup.json";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../Hooks/useToken";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (token) {
    navigate("/");
  }

  const handleSignUp = (data) => {
    setSignUpError("");
    setPasswordMatchError("");

    if (data.password !== data.confirmPassword) {
      setPasswordMatchError("Password does not match!");
      return;
    }

    setLoadingButton(true);

    // checks if user already exists in db
    // if(user does not exist) then call saveusertomongo
    fetch(`http://localhost:5000/checkUser?email=${data.email}`)
      .then((res) => res.json())
      .then((serverData) => {
        if (serverData.status) {
          setLoadingButton(false);
          toast.error(serverData.message);
          return;
        } else {
          createUser(data.email, data.password)
            .then((result) => {
              const userInfo = {
                displayName: data.name,
              };

              updateUserProfile(userInfo)
                .then(() => {
                  saveUserToDb(data.email, data.name, data.userType, false);
                  // issue jwt token here
                })
                .catch((error) => {
                  console.error(error);
                  setSignUpError(error.message);
                  setLoadingButton(false);
                });
            })
            .catch((error) => {
              console.error(error);
              setSignUpError(error.message);
              setLoadingButton(false);
            });
        }
      });
  };

  const saveUserToDb = (email, name, userType, verified) => {
    const userData = {
      email,
      name,
      userType,
      verified,
    };

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLoginUserEmail(email);
          toast.success(data.message);
          setLoadingButton(false);
          // navigate("/");
        } else {
          toast.error(data.message);
          setLoadingButton(false);
        }
      });
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
            {passwordMatchError && (
              <p className="text-sm text-red-500 -mt-5">{passwordMatchError}</p>
            )}
            {!loadingButton ? (
              <button className="py-2 bg-green-500 text-white hover:bg-green-700 hover:border-green-700 mt-3 btn">
                Sign Up
              </button>
            ) : (
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
                Signing up...
              </button>
            )}
            {signUpError && (
              <p className="text-sm text-red-500 -mt-5">{signUpError}</p>
            )}
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
