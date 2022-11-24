import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logos/icons8-laptop-94.png";
import { RiLoginCircleFill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md text-black">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                className="rounded-x bg-white border border-white hover:bg-transparent hover:border-primary mr-2"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="rounded-xl bg-white border border-white hover:bg-transparent hover:border-primary mr-2"
                to="/blog"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case hover:bg-transparent">
          <img className="w-12" src={logo} alt="" />{" "}
          <span className="text-3xl text-[#0FAEEF]">Swapper</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              className="rounded-xl text-black bg-white border border-white hover:bg-transparent hover:border-primary mr-2"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="rounded-xl text-black bg-white border border-white hover:bg-transparent hover:border-primary mr-2"
              to="/blog"
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/"
          className="text-white btn btn-primary hover:bg-sky-400 hover:border-sky-400"
        >
          Login <RiLoginCircleFill className="ml-2 text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;