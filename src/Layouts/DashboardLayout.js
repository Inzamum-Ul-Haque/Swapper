import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { BsCardList, BsPeopleFill } from "react-icons/bs";
import { BiNotepad } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { AuthContext } from "../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Pages/Shared/Loading/Loading";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const url = `https://products-resale-server-nu.vercel.app/user?email=${user?.email}`;

  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axios.get(url);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  let li = "";
  if (userData?.data?.userType === "Buyer") {
    li = (
      <>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard/my-orders">
            <BsCardList /> My Orders
          </Link>
        </li>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard/my-wishlist">
            <BiNotepad /> My Wishlist
          </Link>
        </li>
      </>
    );
  } else if (userData?.data?.userType === "Seller") {
    li = (
      <>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard/add-product">
            <GrAdd /> Add a Product
          </Link>
        </li>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard/my-products">
            <MdProductionQuantityLimits /> My Products
          </Link>
        </li>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard/my-buyers">
            <BsPeopleFill /> My Buyers
          </Link>
        </li>
      </>
    );
  } else {
    li = (
      <>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard/all-sellers">
            <FaPeopleArrows /> All Sellers
          </Link>
        </li>
        <li className="hover:bg-gray-300 rounded-md">
          <Link to="/dashboard/all-buyers">
            <IoIosPeople /> All Buyers
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
