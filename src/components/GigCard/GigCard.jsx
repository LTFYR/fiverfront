import React, { useEffect, useState } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { categories } from "../../database/database";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import request from "../../utils/request";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser"],
    queryFn: () =>
      request.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  console.log(data);

  const newdata = request
    .get(`/users/${item.userId}`)
    .then((res) => console.log(res.data));

  return (
    <Link className="link" to={`/category/${item._id}`}>
      <div className="gigcard">
        <img src={item.coverImg} alt="" />
        <div className="gigcard__info">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Error"
          ) : (
            <div className="gigcard__info__user">
              <img src={data.img || "/images/avatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc.substring(0, 20)}</p>
          <div className="gigcard__info__rate">
            <img src="/images/star.png" alt="" />
            <span>
              {!isFinite(item.totalRating / item.startNum)
                ? 0
                : Math.round(item.totalRating / item.startNum)}
            </span>
          </div>
        </div>
        <hr />
        <div className="gigcard__detail">
          <img src="/images/heart.png" alt="" />
          <div className="gigcard__detail__price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
