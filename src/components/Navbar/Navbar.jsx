import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import request from "../../utils/request";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { pathname } = useLocation();

  const scrollPage = () => {
    window.scrollY > 0 ? setNav(true) : setNav(false);
  };

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

  useEffect(() => {
    window.addEventListener("scroll", scrollPage);

    return () => {
      window.removeEventListener("scroll", scrollPage);
    };
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={nav || pathname !== "/" ? "navbar active" : "navbar "}>
      <div className="navbar__container">
        <div className="navbar__container__logo">
          <Link className="link" to="/">
            <span className="navbar__container__logo--fiver">fiverr</span>
          </Link>
          <span className="navbar__container__logo--dot">.</span>
        </div>
        <div className="navbar__container__links">
          <Link className="link">Fiverr Business</Link>
          <Link className="link" to="/gigs">
            Explore
          </Link>
          <Link className="link">English</Link>
          {!user?.isSeller && <span>Become a Seller</span>}
          {!user && (
            <>
              <span onClick={Login}>Sign in</span>
              {!user?.isSeller && <button onClick={Register}>Join</button>}
            </>
          )}
          {user && (
            <div
              className="navbar__container__links__user"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <img src={user.img || "/images/avatar.jpg"} alt="" />
              <span>{user?.username}</span>
              {openMenu && (
                <div className="navbar__container__links__user__menu">
                  {user.isSeller && (
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(nav || pathname !== "/") && (
        <>
          <hr />
          <div className="navbar__menu">
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
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
