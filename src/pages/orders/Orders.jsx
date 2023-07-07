import React from "react";
import "./Orders.scss";
import { GrContact } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () =>
      await request.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleMessage = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;

    const id = sellerId + buyerId;

    try {
      const res = await request.get(`/conversations/conversation/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await request.post(`/conversations`, {
          to: user.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Error occured"
      ) : (
        <div className="orders__container">
          <div className="orders__container__title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{user?.isSeller ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img src={order.image} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>{user?.isSeller ? order?.buyerId : order?.sellerId}</td>
                <td>
                  <GrContact onClick={() => handleMessage(order)} />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
