import React, { useEffect } from "react";
import config from "../config";
import { Search } from "@material-ui/icons";
import { fontSize } from "@mui/system";
import { useCookies } from "react-cookie";

const Nav = ({ part }) => {
  const [cookie, setCookie] = useCookies(["token"]);
  const isActive = (label) => {
    return label === part ? " active" : "";
  };

  useEffect(() => {
    // console.log(cookie.token, cookie.role);
    if (!cookie.token) setCookie("token", "");
    if (
      (!cookie.token || cookie.token === "") &&
      ["Cart", "Library", "Shelf"].includes(part)
    )
      window.location.href = "/store";
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark p-3 shadow-lg">
        <a className="navbar-brand" href="/">
          SBEAM
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapse"
          aria-controls="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className={"nav-link" + isActive("Store")} href="/store">
                Store
              </a>
            </li>
            {cookie.role === "user" && (
              <React.Fragment>
                <li className="nav-item">
                  <a className={"nav-link" + isActive("Cart")} href="/cart">
                    Cart
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={"nav-link" + isActive("Library")}
                    href="/library"
                  >
                    Library
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={"nav-link" + isActive("Crowdfunding")}
                    href="/crowdfunding"
                  >
                    Crowdfunding
                  </a>
                </li>
              </React.Fragment>
            )}
            {cookie.role === "admin" && (
              <li className="nav-item">
                <a className={"nav-link" + isActive("Shelf")} href="/shelf">
                  Shelf
                </a>
              </li>
            )}
          </ul>

          <form className="nav-item mx-auto" action="/store" method="get">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                name="query"
              />
              <div className="input-group-append">
                <button className="btn border" type="submit">
                  <Search style={{ color: "white" }} fontSize="small" />
                </button>
              </div>
            </div>
          </form>

          <ul className="nav navbar-nav">
            {(!cookie.token || cookie.token === "") && (
              <React.Fragment>
                <li>
                  <a
                    className={"nav-link" + isActive("Sign Up")}
                    href="/register"
                  >
                    Sign Up
                  </a>
                </li>
                <li>
                  <a className={"nav-link" + isActive("Login")} href="/login">
                    Login
                  </a>
                </li>
              </React.Fragment>
            )}
            {cookie.token && cookie.token !== "" && (
              <li>
                <a
                  className={"nav-link" + isActive("Login")}
                  href="/store"
                  onClick={() => {
                    setCookie("token", "");
                    setCookie("role", "");
                  }}
                >
                  LogOut
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
