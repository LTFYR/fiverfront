import React from "react";
import "./CategoryCard.scss";
import { Link } from "react-router-dom";

const CategoryCard = ({ carditem }) => {
  return (
    <Link to="/gigs">
      <div className="categorycard">
        <img src={carditem.img} alt="" />
        <span className="categorycard__desc">{carditem.desc}</span>
        <span className="categorycard__title">{carditem.title}</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
