import React from "react";
import "./GigsHomeCard.scss";
import { Link } from "react-router-dom";

const GigsHomeCard = ({ carditem }) => {
  return (
    <Link to="/" className="link">
      <div className="gigshome">
        <img src={carditem.img} alt="" />
        <div className="gigshome__detail">
          <img src={carditem.pp} alt="" />
          <div className="gigshome__detail__desc">
            <h2>{carditem.cat}</h2>
            <span>{carditem.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigsHomeCard;
