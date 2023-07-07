import React, { useEffect, useState } from "react";
import "./Featured.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import { useQuery } from "@tanstack/react-query";

function Featured() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const { search } = useLocation();
  const [newData, setNewData] = useState(null);

  // const { search } = useLocation();

  const fetchData = async (value) => {
    await request.get(`/gigs`).then((res) => {
      const results = data.filter((gig) => {
        return (
          value && gig && gig.title && gig.title.toLowerCase().includes(value)
        );
      });
      setNewData(results);
    });
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["searchInput"],
    queryFn: async () =>
      await request.get(`/gigs${search}`).then((res) => {
        return res.data;
      }),
  });

  console.log(newData);

  const handleSearch = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="featured">
      <div className="featured__container">
        <div className="featured__container__text">
          <h1>
            Find the right <span>freelance service</span>, right away
          </h1>
          <div className="featured__container__text__search">
            <div className="input">
              <input
                type="text"
                value={input}
                placeholder="Search for any service ..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <button>Search</button>
          </div>
          {newData &&
            newData.map((sr) => (
              <div className="links">
                <Link to={`/category/${sr._id}`}>{sr.title}</Link>
              </div>
            ))}
          {/* {newData !== null && (
            <div className="search-results">
              <span onClick={() => setOpen(false)}>x</span>
            </div>
          )} */}
          <div className="featured__container__text__tags">
            <span>Popular :</span>
            <button>Website Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="featured__container__image">
          <img src="./images/bghome.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
