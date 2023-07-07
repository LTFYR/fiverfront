import React from "react";
import Featured from "../../components/Featured/Featured";
import Partners from "../../components/Partners/Partners";
import Slide from "../../components/Slider/Slide";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { cards } from "../../database/database";
import { gigs } from "../../database/database";
import "./Home.scss";
import GigsHomeCard from "../../components/GigsHomeCard/GigsHomeCard";
import LogoMaker from "../../components/LogoMaker/LogoMaker";
import HomeCategories from "../../components/HomeCategories/HomeCategories";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Home = () => {
  const options = {
    loop: false,
    rewind: true,
    margin: 18,
    nav: true,
    animateIn: "bounceInRight",
    animateOut: "bounceOutRight",
    dots: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };

  const options2 = {
    loop: false,
    rewind: true,
    margin: 18,
    nav: true,
    animateIn: "bounceInRight",
    animateOut: "bounceOutRight",
    dots: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };

  return (
    <div className="home">
      <Featured />
      <Partners />
      <OwlCarousel {...options} className="owl-carousel category-owl">
        {cards.map((carditem) => (
          <CategoryCard carditem={carditem} key={carditem.id} />
        ))}
      </OwlCarousel>
      <div className="home__features">
        <div className="home__features__container">
          <div className="home__features__container__content">
            <h1>The best part? Everything.</h1>
            <div className="home__features__container__content__title">
              <img src="/images/check.png" alt="" />
              Stick to your budget
            </div>
            <p>
              Find the right service for every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="home__features__container__content__title">
              <img src="/images/check.png" alt="" />
              Get quality work done quickly
            </div>
            <p>
              Hand your project over to a talented freelancer in minutes, get
              long-lasting results.
            </p>
            <div className="home__features__container__content__title">
              <img src="/images/check.png" alt="" />
              Pay when you're happy
            </div>
            <p>
              Upfront quotes mean no surprises. Payments only get released when
              you approve.
            </p>
            <div className="home__features__container__content__title">
              <img src="/images/check.png" alt="" />
              Count on 24/7 support
            </div>
            <p>
              Our round-the-clock support team is available to help anytime,
              anywhere.
            </p>
          </div>
          <div className="home__features__container__content">
            <video src="/images/video.mp4" controls></video>
          </div>
        </div>
      </div>
      <HomeCategories />
      <div className="home__features homebg">
        <div className="home__features__container">
          <div className="home__features__container__content flex1">
            <h1 className="first">
              <span>fiverr</span> business.
            </h1>
            <h1 className="second">
              A solution built for <i>business</i>
            </h1>
            <p>
              Upgrade to a curated experience to access vetted talent and
              exclusive tools
            </p>
            <div className="home__features__container__content__title title">
              <img src="/images/check.png" alt="" />
              Talent matching
            </div>
            <div className="home__features__container__content__title  title">
              <img src="/images/check.png" alt="" />
              Dedicated account management
            </div>
            <div className="home__features__container__content__title title">
              <img src="/images/check.png" alt="" />
              Team collaboration tools
            </div>
            <div className="home__features__container__content__title title">
              <img src="/images/check.png" alt="" />
              Business payment solutions
            </div>
            <button>Explore Fiverr Business</button>
          </div>
          <div className="home__features__container__content flex2">
            <img src="/images/features.png" alt="" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="title">
          <h2>Inspiring work made on Fiverr</h2>
          <Link to="/" className="link">
            See more
          </Link>
        </div>
        <OwlCarousel {...options2} className="owl-carousel carditem-owl">
          {gigs.map((carditem) => (
            <GigsHomeCard carditem={carditem} key={carditem.id} />
          ))}
        </OwlCarousel>
      </div>
      <LogoMaker />
    </div>
  );
};

export default Home;
