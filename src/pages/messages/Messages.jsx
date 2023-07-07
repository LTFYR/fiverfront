import React from "react";
import "./Messages.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../../utils/request";
import moment from "moment";

const Messages = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () =>
      await request.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const client = useQueryClient();

  const user = JSON.parse(localStorage.getItem("user"));

  const mutation = useMutation({
    mutationFn: (id) => {
      return request.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      client.invalidateQueries(["messages"]);
    },
  });

  const markAsRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Error occured"
      ) : (
        <div className="messages__container">
          <div className="messages__container__title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>Buyer</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((message, index) => (
              <tr
                className={
                  (user.isSeller && !message.readBySeller) ||
                  (!user.isSeller && !message.readByBuyer && "active")
                }
                key={message.id}
              >
                <td>{user.isSeller ? message.buyerId : message.sellerId}</td>
                <td>
                  <Link to={`/message/${message.id}`} className="link">
                    {message?.exsistMessage}...
                  </Link>
                </td>
                <td>{moment(message.updatedAt).fromNow()}</td>
                <td>
                  {((user.isSeller && !message.readBySeller) ||
                    (!user.isSeller && !message.readByBuyer)) && (
                    <button onClick={() => markAsRead(message.id)}>
                      Mark as read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
