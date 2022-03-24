import React, { Component } from "react";
import Navbar from "./navbar";
import { apiCall } from "./helper";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [loginData, setData] = React.useState({ username: "", password: "" });
  const history = useHistory();
  const [cookie, setCookie] = useCookies(["token"]);

  const updateData = (key, val) => {
    let newData = { ...loginData };
    newData[key] = val;
    setData(newData);
  };
  const checkPsw = () => {
    console.log("/login", loginData);
    if (loginData.password === "" || loginData.username === "")
      alert("username and password can not be empty");
    else
      apiCall(
        `/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        },
        (data) => {
          setCookie("token", data.token);
          setCookie("role", data.role);
          history.push("/store");
        },
        (err) => {
          // console.log(err);
          alert(err);
        }
      );
  };

  return (
    <div>
      <Navbar part="Login" />
      <div className="container ">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-5 mb-5 shadow">
            <div className="bg-light p-4 shadow">
              <h4>Login</h4>
              <div className="text-left">
                <div className="col-12 mt-4">
                  <input
                    className="col-12"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e) => updateData("username", e.target.value)}
                  />
                </div>
                <div className="col-12 mt-4">
                  <input
                    className="col-12"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => updateData("password", e.target.value)}
                  />
                </div>
                <div className="col-12 mt-4 text-center">
                  <button className="btn btn-dark shadow" onClick={checkPsw}>
                    Login
                  </button>
                </div>
              </div>
              <hr className="mt-4" />
              <div className="col-12">
                <p className="text-center mb-0">
                  Have not account yet? <a href="/register">Signup</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
