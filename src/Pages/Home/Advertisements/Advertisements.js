import React from "react";
import { MdVerified } from "react-icons/md";
import sale from "../../../Assets/gifs/icons8-sale.gif";

const Advertisements = () => {
  return (
    <div className="mt-20 text-secondary">
      <h2 className="text-left text-4xl">Advertisements</h2>
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <div className="card w-72 bg-base-100 shadow-xl relative">
          <img src={sale} className="w-12 absolute right-5 top-5" alt="" />
          <figure className="px-5 pt-5">
            <img
              src="https://www.cloud.ryanscomputers.com/cdn/products/small/asus-15-p1511cma-intel-cdc-n4020-156-inch-hd-11664688133.webp"
              alt=""
              className="rounded-md"
            />
          </figure>
          <div className="card-body text-left">
            <h2 className="card-title">
              Asus 15 P1511CMA Intel CDC N4020 15.6 Inch
            </h2>
            <p>Location: Mirpur-11, Dhaka-1216</p>
            <p>Resale Price: Tk 41,500</p>
            <p>Original Price: Tk 45,000</p>
            <p>Years used: 3 Years</p>
            <p>Posted: 12th February, 12:25 PM</p>
            <p>
              <span className="flex items-center">
                Seller: Inzamum-Ul-Haque{" "}
                <MdVerified className="text-xl text-primary ml-1" />
              </span>
            </p>
            <div className="card-actions mx-auto">
              <button className="btn bg-green-500 text-white hover:bg-green-700 hover:border-green-700 mt-4">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisements;
