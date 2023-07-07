import React, { useEffect } from "react";
import Slide from "../../components/Slider/Slide";
import "./Category.scss";
import {
  AiFillClockCircle,
  AiOutlineArrowRight,
  AiOutlineCheck,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Slider } from "infinite-react-carousel";
import { Link, useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import request from "../../utils/request";
import getUser from "../../utils/getUser";
import Comments from "../../components/Comments/Comments";
import "swiper/css";

const Category = () => {
  const { id } = useParams();

  const gigData = useQuery({
    queryKey: ["gig"],
    queryFn: async () =>
      await request.get(`/gigs/gig/${id}`).then((res) => {
        return res.data;
      }),
  });

  const user = getUser();

  const userId = gigData.data?.userId;

  const userData = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await request.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  console.log(gigData.data, userData.data);

  return (
    <div className="category">
      {gigData?.isLoading ? (
        "Loading"
      ) : gigData.error ? (
        "Error happned"
      ) : (
        <div className="category__container">
          <div className="category__container__left">
            <span className="breadcrumb">FIVERR {">"} GRAPHICS & DESIGN</span>
            <h1>{gigData?.data?.title}</h1>
            {userData.isLoading || !userData.data ? (
              "Loading"
            ) : (
              <div className="category__container__left__user">
                <img
                  className="profile"
                  src={userData?.data?.img || "/images/avatar.jpg"}
                  alt=""
                />
                <span>{userData?.data?.username}</span>
                {isFinite(
                  gigData?.data.totalRating / gigData?.data.startNum
                ) && (
                  <div className="category__container__left__user__rating">
                    {Array(
                      Math.round(
                        gigData?.data.totalRating / gigData?.data.startNum
                      )
                    )
                      .fill()
                      .map((i, index) => (
                        <img key={index} src="/images/star.png" alt="" />
                      ))}
                    <span>
                      {Math.round(
                        gigData?.data.totalRating / gigData?.data.startNum
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}
            <Swiper
              direction={"horizontal"}
              slidesPerView={"auto"}
              spaceBetween={0}
              mousewheel={true}
              speed={700}
              touchReleaseOnEdges={true}
              className="gig-slider"
              pagination={{
                clickable: true,
              }}
            >
              {gigData?.data?.images.map((img) => (
                <SwiperSlide>
                  <img className="section" key={img} src={img} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
            <h2>About this gig</h2>
            <p>{gigData?.data.desc}</p>
            {userData.isLoading || !userData.data ? (
              "Loading"
            ) : (
              <div className="category__container__left__sellerinfo">
                <h2>About The Seller</h2>
                <div className="category__container__left__sellerinfo__user">
                  <img
                    src={userData?.data?.img || "/images/avatar.jpg"}
                    alt=""
                  />
                  <div className="category__container__left__sellerinfo__user__detail">
                    <span>{userData?.data.username}</span>
                    {isFinite(
                      gigData?.data.totalRating / gigData?.data.startNum
                    ) && (
                      <div className="rating">
                        {Array(
                          Math.round(
                            gigData?.data.totalRating / gigData?.data.startNum
                          )
                        )
                          .fill()
                          .map((i, index) => (
                            <img key={index} src="/images/star.png" alt="" />
                          ))}
                        <span>
                          {Math.round(
                            gigData?.data.totalRating / gigData?.data.startNum
                          )}
                        </span>
                      </div>
                    )}
                    <button>Contact me</button>
                  </div>
                </div>
                <div className="category__container__left__sellerinfo__user__desc">
                  <div className="content">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="description">
                        {userData?.data.country}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="description">
                        {userData?.data.createdAt}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="description">1 hour</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="description">about 9 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="description">
                        English,German,Spanish
                      </span>
                    </div>
                  </div>
                  <p>
                    {userData.description
                      ? userData.description
                      : "This user didn't add biography yet..."}
                  </p>
                  <hr />
                  <h5>AI engine</h5>
                  <p>Midjourney</p>
                  <p></p>
                </div>
              </div>
            )}
            <Comments gigId={id} gigData={gigData} />
          </div>
          <div className="category__container__right">
            <div className="category__container__right__price">
              <h3>{gigData?.data.rightTitle}</h3>
              <h2>$ {gigData?.data.price}</h2>
            </div>
            <p>{gigData?.data.rightDesc}</p>
            <div className="category__container__right__detail">
              <div className="content">
                <AiOutlineClockCircle />
                <span>{gigData?.data.deliveryTime} Days Delivery</span>
              </div>
              <div className="content">
                <AiOutlineClockCircle />
                <span>{gigData?.data.revTime} revisions</span>
              </div>
            </div>
            <div className="category__container__right__features">
              {gigData?.data.features.map((ftr) => (
                <div className="content" key={ftr}>
                  <AiOutlineCheck className="green" />
                  <span>{ftr}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`} className="link">
              {!user?.isSeller && (
                <button
                  style={
                    user?.isSeller
                      ? { userSelect: "none" }
                      : { cursor: "pointer" }
                  }
                  className="black"
                >
                  Continue <AiOutlineArrowRight className="arrow" />
                </button>
              )}
            </Link>
            <button className="green">Compare packages</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
