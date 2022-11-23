import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Home/Shared/Navbar/Navbar";
import Footer from "../Pages/Home/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
