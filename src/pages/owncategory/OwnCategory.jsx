import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import "./OwnCategory.scss";
import getUser from "../../utils/getUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../../utils/request";

const OwnCategory = () => {
  const [myError, setMyError] = useState("");

  const user = getUser();

  const client = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["ownGigs"],
    queryFn: async () =>
      await request.get(`/gigs?userId=${user._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return request.delete(`/gigs/${id}`).catch((error) => {
        setMyError(error.response.data);
      });
    },
    onSuccess: () => {
      client.invalidateQueries(["ownGigs"]);
    },
  });

  const deleteGig = (id) => {
    mutation.mutate(id);
  };

  // console.log(data);

  return (
    <div className="owngigs">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Error occured"
      ) : (
        <div className="owngigs__container">
          <div className="owngigs__container__title">
            <h1>{user.isSeller ? "Gigs" : "Orders"}</h1>
            {user.isSeller && (
              <Link to="/add" className="link">
                <button> Add new gig</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data
              ? data.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img src={gig.coverImg} alt="" />
                    </td>
                    <td>{gig.title}</td>
                    <td>{gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      <AiOutlineDelete onClick={() => deleteGig(gig._id)} />
                    </td>
                  </tr>
                ))
              : "You didn't create gigs yet. Go and create"}
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnCategory;
