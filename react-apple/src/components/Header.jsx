import React from "react";
import { Link } from "react-router-dom"; // 👈 Add this import
import logo from "../assets/images/icons/logo-sm.png";
import search from "../assets/images/icons/search-icon-sm.png";
import cart from "../assets/images/icons/cart-sm.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";

function Header() {
  return (
    <header className="nav-wrapper fixed-top">
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-dark">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            {" "}
            {/* 👈 Changed from <a> to <Link> */}
            <img src={logo} alt="logo" />
          </Link>

          {/* Toggle button (mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            ☰
          </button>

          {/* Nav links */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav d-flex gap-4 mx-auto text-center">
              <li className="nav-item">
                <Link className="nav-link" to="/mac">
                  {" "}
                  {/* 👈 Changed to Link */}
                  Mac
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/iphone">
                  {" "}
                  {/* 👈 Changed to Link */}
                  iPhone
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ipad">
                  {" "}
                  {/* 👈 Changed to Link */}
                  iPad
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/watch">
                  {" "}
                  {/* 👈 Changed to Link */}
                  Watch
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tv">
                  {" "}
                  {/* 👈 Changed to Link */}
                  TV
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/music">
                  {" "}
                  {/* 👈 Changed to Link */}
                  Music
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/support">
                  {" "}
                  {/* 👈 Changed to Link */}
                  Support
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  {" "}
                  {/* 👈 Changed to Link */}
                  <img src={search} alt="search" />
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  {" "}
                  {/* 👈 Changed to Link */}
                  <img src={cart} alt="cart" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
