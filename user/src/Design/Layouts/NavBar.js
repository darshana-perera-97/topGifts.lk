import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import searchIcon from "../Assets/search.png";
import navbarLogo from "../Assets/navbarLogo.svg";

export default function NavBar() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchText);
  };

  return (
    <div className="cutomNavbar">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light px-3">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <img src={navbarLogo} alt="Logo" height="35" />
          </a>

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarContent"
          >
            {/* Search Bar */}
            <form className="d-flex search-box">
              <input
                className="form-control me-2 search-input"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn " type="button" onClick={handleSearch}>
                <img src={searchIcon} alt="Logo" width="15" height="15" />
              </button>
            </form>
          </div>

          {/* CTA Button */}
          <button className="btn btn-primary ms-auto px-4 py-2 fw-semibold">
            Get Started
          </button>
        </nav>
      </div>
    </div>
  );
}
