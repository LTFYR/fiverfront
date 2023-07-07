import React, { useState } from "react";
import Comment from "../Comment/Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../../utils/request";
import getUser from "../../utils/getUser";

const Comments = ({ gigData, gigId }) => {
  const [myError, setMyError] = useState("");
  const client = useQueryClient();
  const { isLoading, error, data, failureReason } = useQuery({
    queryKey: ["comments"],
    queryFn: async () =>
      await request.get(`/comments/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const user = getUser();

  const mutation = useMutation({
    mutationFn: async (comment) => {
      return request.post("/comments", comment).catch((error) => {
        setMyError(error.response.data);
      });
    },
    onSuccess: () => {
      client.invalidateQueries(["comments"]);
    },
  });

  console.log(myError);

  const handleComment = (e) => {
    e.preventDefault();

    const desc = e.target[0].value;
    const stars = e.target[1].value;

    mutation.mutate({ gigId, desc, stars });
  };

  return (
    <div className="category__container__left__reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Error occured"
        : data.map((comment) => (
            <Comment key={comment._id} comment={comment} gigData={gigData} />
          ))}
      <hr />
      <div className="add-comment">
        <h3>Add new review</h3>
        <form action="" onSubmit={handleComment}>
          <div className="forminp">
            <input type="text" placeholder="Your review" />
            <select name="" id="">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button
            style={
              user?.isSeller ? { userSelect: "none" } : { userSelect: "auto" }
            }
          >
            Send
          </button>
        </form>
        <span style={{ color: "red" }}>{myError}</span>
      </div>
    </div>
  );
};

export default Comments;
