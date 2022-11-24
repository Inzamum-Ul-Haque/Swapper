import React from "react";
import asus from "../../../Assets/images/asus.png";
import hp from "../../../Assets/images/hp.png";
import dell from "../../../Assets/images/dell.png";
import acer from "../../../Assets/images/acer.png";
import lenovo from "../../../Assets/images/lenovo.png";
import msi from "../../../Assets/images/msi.png";

const Categories = () => {
  return (
    <div className="mt-20 text-secondary">
      <h2 className="text-left text-4xl">Categories</h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <div className="card w-96 h-[300px] bg-base-100 shadow-xl image-full">
          <figure className="category-img bg-gradient-to-tr from-[#151515] to-[#454647]">
            <img
              className="mix-blend-overlay"
              src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Shoes"
            />
          </figure>
          <div className="card-body justify-center items-center">
            <img className="cursor-pointer" src={asus} alt="" />
          </div>
        </div>
        <div className="card w-96 h-[300px] bg-base-100 shadow-xl image-full">
          <figure className="category-img bg-gradient-to-tr from-[#151515] to-[#454647]">
            <img
              className="mix-blend-overlay"
              src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Shoes"
            />
          </figure>
          <div className="card-body justify-center items-center">
            <img src={hp} alt="" />
          </div>
        </div>
        <div className="card w-96 h-[300px] bg-base-100 shadow-xl image-full">
          <figure className="category-img bg-gradient-to-tr from-[#151515] to-[#454647]">
            <img
              className="mix-blend-overlay"
              src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Shoes"
            />
          </figure>
          <div className="card-body justify-center items-center">
            <img src={acer} alt="" />
          </div>
        </div>
        <div className="card w-96 h-[300px] bg-base-100 shadow-xl image-full">
          <figure className="category-img bg-gradient-to-tr from-[#151515] to-[#454647]">
            <img
              className="mix-blend-overlay"
              src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Shoes"
            />
          </figure>
          <div className="card-body justify-center items-center">
            <img src={dell} alt="" />
          </div>
        </div>
        <div className="card w-96 h-[300px] bg-base-100 shadow-xl image-full">
          <figure className="category-img bg-gradient-to-tr from-[#151515] to-[#454647]">
            <img
              className="mix-blend-overlay"
              src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Shoes"
            />
          </figure>
          <div className="card-body justify-center items-center">
            <img src={lenovo} alt="" />
          </div>
        </div>
        <div className="card w-96 h-[300px] bg-base-100 shadow-xl image-full">
          <figure className="category-img bg-gradient-to-tr from-[#151515] to-[#454647]">
            <img
              className="mix-blend-overlay"
              src="https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Shoes"
            />
          </figure>
          <div className="card-body justify-center items-center">
            <img src={msi} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
