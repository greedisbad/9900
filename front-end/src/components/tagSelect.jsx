import React, { Component, useState } from "react";
import Navbar from "./navbar";
import { useCookies } from "react-cookie";
import { apiCall } from "./helper";

const tagArr = [
  "3D",
  "Action",
  "Adventure",
  "Casual",
  "Exploration",
  "FPS",
  "Indie",
  "Massively Multiplayer",
  "Open World",
  "Puzzle",
  "RPG",
  "Racing",
  "Sexual Content",
  "Simulation",
  "Sports",
  "Strategy",
  "Survival",
  "Tactical",
];

const TagSelect = () => {
  const [selected, setSelect] = React.useState(
    Array(tagArr.length).fill(false)
  );
  const [cookie, setCookie] = useCookies(["token"]);

  const select = (idx) => {
    let newSelected = [...selected];
    newSelected[idx] = !newSelected[idx];
    setSelect(newSelected);
  };

  const confirm = () => {
    const arr = tagArr.filter((_, i) => selected[i]);

    apiCall(
      `/user/tag`,
      {
        method: "POST",
        headers: {
          Authorization: cookie.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: arr }),
      },
      (data) => console.log(data),
      (err) => console.log(err)
    );
    window.location.href = "/store";
  };

  return (
    <div>
      <Navbar part="" />
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 shadow-lg">
            <div className="p-3 bg-grad text-left">
              <div>
                <h4 className="raw text-light p-2 text-center">
                  Please choose your preferred game genre
                </h4>
              </div>
              <div>
                {tagArr.map((tag, i) => {
                  return (
                    <button
                      onClick={() => select(i)}
                      className={
                        "btn m-2" +
                        (selected[i] ? " btn-success" : " btn-secondary")
                      }
                      key={i}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 text-right">
                <button
                  onClick={() => {
                    setSelect(Array(tagArr.length).fill(false));
                  }}
                  className="btn btn-primary m-2"
                >
                  Reset
                </button>
                <button className="btn btn-primary m-2" onClick={confirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSelect;
