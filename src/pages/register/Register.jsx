import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import uploadFile from "../../utils/upload";
import request from "../../utils/request";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    img: "",
    isSeller: false,
    description: "",
  });
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const url = await uploadFile(file);
    try {
      await request.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const seller = (e) => {
    setUser((p) => {
      return { ...p, isSeller: e.target.checked };
    });
  };

  return (
    <div className="register">
      <form onSubmit={handleForm}>
        <div className="leftside">
          <h1>Create new account</h1>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your username"
            onChange={handleInput}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            onChange={handleInput}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            onChange={handleInput}
          />
          <label htmlFor="">Profile Image</label>
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="">Country</label>
          <input
            onChange={handleInput}
            type="text"
            name="country"
            placeholder="Your country"
          />
          <button>Register</button>
        </div>
        <div className="rightside">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={seller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            onChange={handleInput}
            name="phone"
            type="text"
            placeholder="+994 77 999 99 99"
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="description"
            id=""
            cols="30"
            rows="10"
            onChange={handleInput}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
