import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../../utils/request";

const Message = () => {
  const { id } = useParams();

  const client = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () =>
      await request.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return request.post(`/messages`, message);
    },
    onSuccess: () => {
      client.invalidateQueries(["messages"]);
    },
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleMessage = (event) => {
    event.preventDefault();
    mutation.mutate({
      conversartionId: id,
      text: event.target[0].value,
    });
    event.target[0].value = "";
  };

  return (
    <div className="singlemsg">
      <div className="singlemsg__container">
        <span className="breadcrumb">
          <Link to="/messages" className="link">
            Messages
          </Link>
          {">"} Jane Miller
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Error occured"
        ) : (
          <div className="singlemsg__container__messages">
            {data?.map((message) => (
              <div
                className={
                  message.userId === user._id ? "ownmsg content" : "content"
                }
                key={message._id}
              >
                <img
                  src={
                    message.userId === user._id
                      ? user.img
                        ? user.img
                        : "/images/like.png"
                      : "/images/avatar.jpg"
                  }
                  alt=""
                />
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="singlemsg__container__type" onSubmit={handleMessage}>
          <textarea
            name=""
            id=""
            placeholder="Your message ..."
            cols="30"
            rows="10"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
