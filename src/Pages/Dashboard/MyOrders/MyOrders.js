import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { MdPayment } from "react-icons/md";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import Payment from "../Payment/Payment";

const MyOrders = () => {
  // const [paid, setPaid] = useState("");
  const { user } = useContext(AuthContext);
  const [bookingData, setBookingData] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/orders?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const { data } = orders;

  const handlePayment = () => {
    refetch();
  };

  return (
    <div>
      {data.length === 0 ? (
        <h1 className="text-4xl text-center mt-16 text-gray-600">
          You have no orders
        </h1>
      ) : (
        <div>
          <h1 className="text-4xl text-secondary text-left mt-8 ml-5 mb-5">
            My Orders
          </h1>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-gray-300 w-[5%]">Serial</th>
                <th className="bg-gray-300 w-[30%]">Product Name</th>
                <th className="bg-gray-300 w-[30%]">Price</th>
                <th className="bg-gray-300 w-[30%]">Tr Id</th>
                <th className="bg-gray-300 w-[5%] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((singleData, idx) => (
                <tr key={singleData._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={singleData?.productImage} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {singleData?.productName?.slice(0, 30) + " ..."}
                        </div>
                        <div className="text-sm opacity-50">
                          Meet at {singleData?.meetUpLocation}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>Tk {singleData?.productResalePrice}</td>
                  <td>
                    {singleData?.transactionId ? (
                      <p>{singleData.transactionId}</p>
                    ) : (
                      <p>...</p>
                    )}
                  </td>
                  <td>
                    {singleData?.paid ? (
                      <p className="text-lg font-bold text-green-500">Paid</p>
                    ) : (
                      <button className="text-white text-sm btn btn-sm bg-yellow-500 hover:bg-yellow-600 hover:border-yellow-600">
                        <label
                          onClick={() => setBookingData(singleData)}
                          htmlFor="payment-modal"
                          className="flex items-center"
                        >
                          Pay <MdPayment className="ml-1" />
                        </label>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {bookingData && (
        <Payment
          setBookingData={setBookingData}
          bookingData={bookingData}
          handlePayment={handlePayment}
        />
      )}
    </div>
  );
};

export default MyOrders;
