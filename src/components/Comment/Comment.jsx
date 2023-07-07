import React from "react";
import "./Comment.scss";
import { useQuery } from "@tanstack/react-query";
import request from "../../utils/request";

const Comment = ({ gigData, comment }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [comment.userId],
    queryFn: async () =>
      await request.get(`/users/${comment.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="category__container__left__reviews__content">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Error occured"
      ) : (
        <div className="category__container__left__reviews__content__user">
          <img
            className="profile"
            src={data.img || "/images/avatar.jpg"}
            alt=""
          />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <img src="/images/flag.png" alt="" />
              <span>{data.country}</span>
            </div>
            {isFinite(gigData?.data.totalRating / gigData?.data.startNum) && (
              <div className="rating">
                {Array(comment.stars)
                  .fill()
                  .map((cmnt, index) => (
                    <img src="/images/star.png" key={index} alt="" />
                  ))}
                <span>{comment.stars}</span>
              </div>
            )}
            <p>{comment.desc}</p>
            <div className="satisfied">
              <span>Helpful?</span>
              <img src="/images/like.png" alt="" />
              <span>Yes</span>
              <img src="/images/dislike.png" alt="" />
              <span>No</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
