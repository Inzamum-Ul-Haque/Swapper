import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        "https://products-resale-server-nu.vercel.app/categories"
      );
      return res.data;
    },
  });
  const { data } = categories;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-20 text-secondary">
      <h2 className="lg:text-left md:text-center sm:text-center text-4xl">
        Categories
      </h2>
      <div className="mt-10 grid gap-5 justify-items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {data.map((category) => (
          <div
            key={category._id}
            className="card w-96 h-[300px] bg-base-100 shadow-xl image-full"
          >
            <figure className="category-img bg-gradient-to-tr from-[#151515] to-[#454647]">
              <img
                className="mix-blend-overlay transition-transform"
                src={category.image}
                alt=""
              />
            </figure>
            <div className="card-body justify-center items-center">
              <Link to={`/category/${category._id}`}>
                <img
                  className="cursor-pointer hover:scale-110 duration-500"
                  src={category.logo}
                  alt=""
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
