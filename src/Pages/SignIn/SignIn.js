import React, { useContext, useState } from "react";
import signin from "../../Assets/lotties/signin.json";
import Lottie from "react-lottie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-hot-toast";
import useToken from "../../Hooks/useToken";

const SignIn = () => {
  const { signInUser, providerLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [googleLoginError, setGoogleLoginError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleSignIn = (data) => {
    setLoginError("");

    setLoadingButton(true);
    signInUser(data.email, data.password)
      .then((result) => {
        // issue jwt
        setLoginUserEmail(data.email);
        setLoadingButton(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingButton(false);
        setLoginError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    setGoogleLoginError("");
    providerLogin(googleProvider)
      .then((result) => {
        fetch(
          `https://products-resale-server-nu.vercel.app/checkUser?email=${result?.user?.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            // checks if user already exists in db
            // if(user does not exist) then call saveusertomongo
            if (data.status) {
              setLoginUserEmail(result?.user?.email);
              // navigate(from, { replace: true });
            } else {
              saveUserToDb(
                result.user.email,
                result.user.displayName,
                "Buyer",
                false
              );
            }
          });
      })
      .catch((error) => {
        console.error(error);
        setGoogleLoginError(error.message);
      });
  };

  const saveUserToDb = (email, name, userType, verified) => {
    const userData = {
      email,
      name,
      userType,
      verified,
    };

    fetch("https://products-resale-server-nu.vercel.app/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          // issue jwt token
          setLoginUserEmail(email);
          toast.success(data.message);
          // navigate(from, { replace: true });
        } else {
          toast.error(data.message);
        }
      });
  };

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

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-y-5 w-3/4"
          >
            <input
              className="p-2 mt-8 rounded-xl border focus:border-primary"
              type="email"
              {...register("email", {
                required: "Please provide your email address",
              })}
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
              {...register("password", {
                required: "Please provide your password",
              })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 -mt-5">
                {errors.password.message}
              </p>
            )}
            {!loadingButton ? (
              <button className="py-2 bg-green-500 text-white hover:bg-green-700 hover:border-green-700 mt-3 btn">
                Sign In
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
                Signing in...
              </button>
            )}
            {loginError && (
              <p className="text-sm text-red-500 -mt-5">{loginError}</p>
            )}

            <div className="grid grid-cols-3 items-center text-gray-600 w-full">
              <hr className="text-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="text-gray-400" />
            </div>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="bg-white border py-2 rounded-xl mt-5 flex justify-center items-center w-3/4 hover:shadow-sm hover:shadow-gray-600"
          >
            <FcGoogle className="mr-3" />{" "}
            <span className="text-sm">Login with Google</span>
          </button>
          {googleLoginError && (
            <p className="text-sm text-red-500 text-left mt-5">{loginError}</p>
          )}
        </div>
        <div>
          <Lottie options={defaultOptions} height={480} width={480} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
