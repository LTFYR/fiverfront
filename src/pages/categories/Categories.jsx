import React, { useEffect, useRef } from "react";
import "./Categories.scss";
import { useState } from "react";
import { categories } from "../../database/database";
import GigCard from "../../components/GigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import request from "../../utils/request";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Categories() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const [gigs, setGigs] = useState([]);

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const getGigs = async () => {
    await request.get(`/gigs`).then((res) => {
      console.log(res.data);
      return setGigs(res.data);
    });
  };

  //I don't know why it doesn't work
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: async () =>
      await request
        .get(
          `/gigs${search}?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const sortItems = (t) => {
    setSort(t);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, search]);

  const minmaxfilter = () => {
    refetch();
  };

  // console.log(data.map((d) => d));

  return (
    <div className="gigs">
      <div className="gigs__container">
        <span className="head">
          FIVERR {">"} GRAPHICS & DESIGN {">"}
        </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundries of art and technology with Fiverr's AI artists
        </p>
        <div className="gigs__container__content">
          <div className="gigs__container__content__left">
            <span>Budged</span>
            <input ref={minRef} type="text" placeholder="min" />
            <input ref={maxRef} type="text" placeholder="max" />
            <button onClick={minmaxfilter}>Apply</button>
          </div>
          <div className="gigs__container__content__right">
            <span className="sortby">Sort By</span>
            <span className="sorttype">
              {sort === "sales" ? "Best Selling" : "Newest"}{" "}
            </span>
            <img src="/images/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="menu">
                {sort === "sales" ? (
                  <span onClick={() => sortItems("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => sortItems("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="gigs__container__allgigcards">
          {isLoading
            ? "Loading"
            : error
            ? "Error"
            : data && data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Categories;
