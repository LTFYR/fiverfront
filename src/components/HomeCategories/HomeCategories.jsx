import React from "react";
import "./HomeCategories.scss";

const HomeCategories = () => {
  return (
    <div className="homecateg">
      <div className="homecateg__container">
        <h2>You need it, we've got it</h2>
        <ul>
          <li>
            <img src="/images/design.svg" alt="" />
            Graphics & Design
          </li>
          <li>
            <img src="/images/marketing.svg" alt="" />
            Digital Marketing
          </li>
          <li>
            <img src="/images/writing.svg" alt="" />
            Writing & Translation
          </li>
          <li>
            <img src="/images/coffe.svg" alt="" />
            Lifestyle
          </li>
          <li>
            <img src="/images/video.svg" alt="" />
            Video & Animation
          </li>
          <li>
            <img src="/images/music.svg" alt="" />
            Music & Audio
          </li>
          <li>
            <img src="/images/coding.svg" alt="" />
            Programming & Tech
          </li>
          <li>
            <img src="/images/business.svg" alt="" />
            Business
          </li>
          <li>
            <img src="/images/data.svg" alt="" />
            Data
          </li>
          <li>
            <img src="/images/photography.svg" alt="" />
            Photography
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeCategories;
