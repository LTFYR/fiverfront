import React from "react";
import "./LogoMaker.scss";
import { Link } from "react-router-dom";

const LogoMaker = () => {
  return (
    <div className="logomaker">
      <div className="logomaker__container">
        <div className="logomaker__container__text">
          <small>
            <i>fiverr</i>
            logo maker.
          </small>
          <h2>
            Make an incredible logo <i>in minutes</i>
          </h2>
          <div>Pre-designed by top talent.Just add your touch.</div>
          <Link to="/">Try Fiverr Logo Maker</Link>
        </div>
        <div className="logomaker__container__image">
          <img src="/images/logomaker.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LogoMaker;
