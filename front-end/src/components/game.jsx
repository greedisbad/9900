import React, { Component, useState } from "react";
import config from "../config.js";
import { GetAppSharp, Edit as EditIcon } from "@material-ui/icons";
import Tags from "./tags.jsx";
import { useHistory } from "react-router-dom";

const Game = ({ gameInfo, decor }) => {
  const history = useHistory();
  const Decor = () => {
    if (decor === undefined) return <span>{"$" + gameInfo.price}</span>;
    else if (decor === "donate")
      return (
        <a href={"/detail?id=" + gameInfo.id} className="text-light">
          <button className="btn btn-success mt-2">donate</button>
        </a>
      );
    else
      return (
        <React.Fragment>
          {decor === "download" ? (
            <button className="btn btn-primary mt-2">
              <GetAppSharp />
            </button>
          ) : (
            <a href={"/edit?id=" + gameInfo.id} className="text-light">
              <button className="btn btn-primary mt-2">
                <EditIcon />
              </button>
            </a>
          )}
        </React.Fragment>
      );
  };

  return (
    <div className="container mt-3 mb-3">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 shadow-lg">
          <div className="row p-3 bg-grad text-light">
            <div className="col-md-4">
              <a className="feed-image" href={"/detail?id=" + gameInfo.id}>
                <img
                  className=" rounded img-fluid img-responsive"
                  src={`data:image/jpeg;base64,${gameInfo.thumbnail}`}
                />
              </a>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 mt-2">
                  <div className="text-left">
                    <h5>{gameInfo.name}</h5>
                  </div>
                </div>
                <div className="col-md-3">
                  <Decor />
                </div>
              </div>
              <Tags tags={gameInfo.tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
