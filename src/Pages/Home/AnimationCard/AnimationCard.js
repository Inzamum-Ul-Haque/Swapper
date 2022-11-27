import React from "react";
import Lottie from "react-lottie";
import browse from "../../../Assets/lotties/browse";
import booking from "../../../Assets/lotties/booking";
import location from "../../../Assets/lotties/location";

const AnimationCard = () => {
  const defaultOptions = [
    {
      options: {
        loop: true,
        autoplay: true,
        animationData: browse,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      },
      text: "Browse Resale Products",
    },
    {
      options: {
        loop: true,
        autoplay: true,
        animationData: booking,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      },
      text: "Book a Product",
    },
    {
      options: {
        loop: true,
        autoplay: true,
        animationData: location,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      },
      text: "Set up a Location",
    },
  ];

  return (
    <div className="mt-20">
      <div className="grid justify-items-center gap-y-5 lg:grid-cols-3 md:grid-cols-2 md:gap-5 sm:grid-cols-1 sm:gap-5 text-white">
        {defaultOptions.map((defaultOption, idx) => (
          <div key={idx} className="card w-96 h-80 shadow-2xl bg-green-500">
            <figure>
              <Lottie
                options={defaultOption.options}
                height={200}
                width={200}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-3xl">{defaultOption.text}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationCard;
