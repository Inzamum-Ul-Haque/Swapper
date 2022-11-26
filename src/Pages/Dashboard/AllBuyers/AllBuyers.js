import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { toast } from "react-hot-toast";

const AllBuyers = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const {
    data: allBuyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/users?type=${"Buyer"}`
      );
      return res.data;
    },
  });
  const { allData } = allBuyers;

  if (isLoading) {
    return <Loading />;
  }

  const handleUserDelete = (email) => {
    setLoadingButton(true);
    fetch(`http://localhost:5000/user?email=${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success(result.message);
          setLoadingButton(false);
          refetch();
        } else {
          toast.error(result.message);
          setLoadingButton(false);
        }
      });
  };

  return (
    <div>
      {allData.length === 0 ? (
        <h1 className="text-4xl text-center mt-16 text-gray-600">
          No buyers to show
        </h1>
      ) : (
        <div className="overflow-x-auto">
          <h1 className="text-4xl text-secondary text-left mt-8 ml-5 mb-5">
            Buyers
          </h1>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-gray-300"></th>
                <th className="bg-gray-300">Name</th>
                <th className="bg-gray-300">Email</th>
                <th className="bg-gray-300"></th>
                <th className="bg-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {allData.map((singleUser, idx) => (
                <tr key={singleUser._id} className="hover:bg-gray-500">
                  <th>{idx + 1}</th>
                  <td>{singleUser.name}</td>
                  <td>{singleUser.email}</td>
                  <td>
                    {singleUser.verified ? (
                      <p className="text-sm font-bold text-green-500">
                        Verified
                      </p>
                    ) : (
                      <button className="text-white btn btn-sm bg-green-500 hover:bg-green-600 hover:border-green-600 text-center">
                        Verify <TiTick className="ml-1" />
                      </button>
                    )}
                  </td>
                  <td>
                    {loadingButton ? (
                      <button
                        onClick={() => handleUserDelete(singleUser.email)}
                        className="text-white text-sm btn btn-sm bg-red-500 hover:bg-red-600 hover:border-red-600"
                      >
                        Delete{" "}
                        <svg
                          className="w-3 h-3 mr-3 -ml-1 text-white animate-spin"
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
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserDelete(singleUser.email)}
                        className="text-white text-sm btn btn-sm bg-red-500 hover:bg-red-600 hover:border-red-600"
                      >
                        Delete <MdDelete className="ml-1" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBuyers;
