import React, { useContext } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "../../node_modules/bootstrap/js/dist/collapse";
import "jquery/dist/jquery.js";
import { NavLink } from 'react-router-dom';
import img from "../images/log1.png";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
        <li className="nav-item">
            <NavLink
              activeClassName="menu_active"
              className="nav-link"
              to="/allotment"
            >
              Room Allotment
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="menu_active"
              className="nav-link"
              to="/logout"
            >
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink
              activeClassName="menu_active"
              className="nav-link"
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="menu_active"
              className="nav-link"
              to="/signup"
            >
              Register
            </NavLink>
          </li>
        </>
      );
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src="has_logo.png" className="logo_img" alt="logo" width="50px" />
          HAS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink
                activeClassName="menu_active"
                className="nav-link"
                to="/home"
              >
                Home <span class="sr-only">(current)</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                activeClassName="menu_active"
                className="nav-link"
                to="/about"
              >
                About Me
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="menu_active"
                className="nav-link"
                to="/contact"
              >
                Complain
              </NavLink>
            </li>
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
