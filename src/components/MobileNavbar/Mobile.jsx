import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import "./Mobile.scss";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";

const Mobile = () => {
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await request.post("/auth/logout");
      localStorage.setItem("user", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const Login = () => {
    navigate("/login");
  };

  const Register = () => {
    navigate("/register");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="mobile">
      <FaHamburger style={{ cursor: "pointer" }} onClick={handleShow} />
      <Link to="/" className="link">
        <b>fiverr</b>
        <span>.</span>
      </Link>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {user ? (
              <button onClick={Login} className="btn-mobile">
                Login
              </button>
            ) : (
              <button onClick={Register} className="btn-mobile">
                Join Fiverr
              </button>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="header">
                Browse Categories
              </Accordion.Header>
              <Accordion.Body className="body">
                {user?.isSeller && (
                  <>
                    <Link className="link" to="/owncategory">
                      MyGigs
                    </Link>
                    <Link to="/add" className="link">
                      Add a New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/gigs">
                  Gigs
                </Link>
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link onClick={handleLogout} className="link" to="/</div>">
                  Logout
                </Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Explore</Accordion.Header>
              <Accordion.Body className="body">
                <Link className="link" to="/">
                  Graphics & Design
                </Link>
                <Link className="link" to="/">
                  Digital Marketing
                </Link>
                <Link className="link" to="/">
                  Writing & Translation
                </Link>
                <Link className="link" to="/">
                  Video & Animation
                </Link>
                <Link className="link" to="/">
                  Music & Video
                </Link>
                <Link className="link" to="/">
                  Programming & Tech
                </Link>
                <Link className="link" to="/">
                  Photography
                </Link>
                <Link className="link" to="/">
                  Business
                </Link>
                <Link className="link" to="/">
                  Ai Services
                </Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Link
            to="/"
            style={{
              color: " #1dbf73",
              fontWeight: "bold",
              paddingLeft: "20px",
              paddingTop: "20px",
              textDecoration: "none",
            }}
          >
            Fiverr Business
          </Link>
        </Offcanvas.Body>
        <Offcanvas.Body className="footer body">
          <h3>General</h3>
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/">
            English
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Mobile;
