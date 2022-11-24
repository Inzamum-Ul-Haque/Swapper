import React from "react";
import Advertisements from "../Advertisements/Advertisements";
import AnimationCard from "../AnimationCard/AnimationCard";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  return (
    <div>
      <Banner />
      <AnimationCard />
      <Advertisements />
      <Categories />
    </div>
  );
};

export default Home;
