import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { BsCardList } from "react-icons/bs";
import { BiNotepad } from "react-icons/bi";

const DashboardLayout = () => {
  let user = "admin";
  let li = "";
  if (user === "admin") {
    li = (
      <>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard">
            <BsCardList /> My Orders
          </Link>
        </li>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard">
            <BiNotepad /> My Wishlist
          </Link>
        </li>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile text-secondary">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side shadow-xl">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80">
            <h2 className="text-4xl text-start pl-4">Dashboard</h2>
            {li}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
