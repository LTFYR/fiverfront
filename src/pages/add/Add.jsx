import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import uploadFile from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../../utils/request";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [img, setImg] = useState(undefined);
  const [imgs, setImgs] = useState([]);
  const [process, setProcess] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleAdd = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURES",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setProcess(true);
    try {
      const coverImg = await uploadFile(img);

      const images = await Promise.all(
        [...imgs].map(async (file) => {
          const dir = await uploadFile(file);
          return dir;
        })
      );
      setProcess(false);
      dispatch({ type: "ADD_IMAGES", payload: { coverImg, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const [myError, setMyError] = useState("");
  const client = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return request
        .post("/gigs", gig)
        .catch((error) => console.log(error.response.data));
    },
    onSuccess: () => {
      client.invalidateQueries(["ownGigs"]);
    },
  });

  const createGig = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/owncategory");
  };

  return (
    <div className="add">
      <div className="add__container">
        <h1>Add new gig</h1>
        <div className="add__container__content">
          <div className="add__container__content__left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g I'll create new image design for you"
              onChange={handleAdd}
            />
            <label htmlFor="">Category</label>
            <select name="category" onChange={handleAdd} id="category">
              <option value="coding">Web Development</option>
              <option value="design">Design</option>
              <option value="youtube">Youtube</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imgInp">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  name="coverImg"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="">Upload Image(s)</label>
                <input
                  type="file"
                  name="images"
                  onChange={(e) => setImgs(e.target.files)}
                  multiple
                />
              </div>
              <button onClick={handleUpload}>
                {process ? "Uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              id="rightTitle"
              cols="30"
              rows="16"
              name="desc"
              onChange={handleAdd}
              placeholder="Add description to explain yourself to the customers"
            ></textarea>
            <button onClick={createGig}>Create</button>
          </div>
          <div className="add__container__content__right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="rightTitle"
              placeholder="e.g. Page design"
              onChange={handleAdd}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="rightDesc"
              cols="30"
              rows="10"
              onChange={handleAdd}
              placeholder="Short description of your service"
            ></textarea>
            <label htmlFor="">Delivery time(e.g 2 days)</label>
            <input type="number" name="deliveryTime" onChange={handleAdd} />
            <label htmlFor="">Revision number</label>
            <input type="number" name="revTime" onChange={handleAdd} />
            <label htmlFor="">Add features</label>
            <form className="feature" action="" onSubmit={handleFeatures}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>
            <div className="features">
              {state?.features?.map((feature) => (
                <div className="content" key={feature}>
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_FEATURE", payload: feature })
                    }
                  >
                    {feature} <span>x</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleAdd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
