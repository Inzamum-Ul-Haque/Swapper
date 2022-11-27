import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const AllBuyers = () => {
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
    const loadingToast = toast.loading("Deleting buyer...");
    fetch(`http://localhost:5000/user?email=${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success(result.message);
          toast.remove(loadingToast);

          refetch();
        } else {
          toast.error(result.message);
          toast.remove(loadingToast);
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
                <th className="bg-gray-300 w-1/5">Serial</th>
                <th className="bg-gray-300 w-1/4">Name</th>
                <th className="bg-gray-300 w-1/4">Email</th>
                <th className="bg-gray-300 w-1/4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((singleUser, idx) => (
                <tr key={singleUser._id} className="hover:bg-gray-500">
                  <th>{idx + 1}</th>
                  <td>{singleUser.name}</td>
                  <td>{singleUser.email}</td>
                  <td className="flex justify-evenly items-center">
                    {singleUser.verified ? (
                      <p className="text-sm font-bold text-green-500">
                        Verified
                      </p>
                    ) : (
                      <button className="text-white btn btn-sm bg-green-500 hover:bg-green-600 hover:border-green-600 text-center">
                        Verify <TiTick className="ml-1" />
                      </button>
                    )}
                    <button
                      onClick={() => handleUserDelete(singleUser.email)}
                      className="text-white text-sm btn btn-sm bg-red-500 hover:bg-red-600 hover:border-red-600"
                    >
                      Delete <MdDelete className="ml-1" />
                    </button>
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
