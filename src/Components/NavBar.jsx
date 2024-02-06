import React, { useContext } from "react";
import "../App.css";
import { searchQuery } from "../Context/searchContext";
import logo from "../Asset/logo.png";

function NavBar() {
  const { searchData, setSearchData } = useContext(searchQuery);

  const handleSearchChange = (event) => {
    setSearchData(event.target.value);
  };

  return (
    <div>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img width={"145px"} className="img-fluid" src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* navlinks */}
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
            </ul>
            {/* form for searching */}
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
                value={searchData}
                onChange={handleSearchChange}
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
