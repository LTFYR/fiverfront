import React from "react";
import "./Slider.scss";
import Slider from "infinite-react-carousel";
import InfiniteCarousel from "react-leaf-carousel";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slider homeslider">
      <div className="slider__container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
        {/* <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ]}
          incrementalSides={true}
          dots={true}
          showSides={true}
          sidesOpacity={0.5}
          sideSize={0.1}
          slidesToScroll={5}
          slidesToShow={5}
          scrollOnDevice={true}
        >
          {children}
        </InfiniteCarousel> */}
      </div>
    </div>
  );
};

export default Slide;
