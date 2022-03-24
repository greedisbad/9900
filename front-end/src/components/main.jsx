import React, { Component, useEffect } from "react";
import Navbar from "./navbar";
import { apiCall } from "./helper";
import Games from "./games";

const Main = () => {
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageLimit, setLimit] = React.useState(0);

  const loadList = () => {
    apiCall(
      `/list?p=${page}&n=10`,
      null,
      (data) => {
        setGames(data["games"]);
        setLimit(data["maxPage"]);
        // console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    loadList();
  }, [page]);

  return (
    <div>
      <Navbar></Navbar>
      <Games
        gamesInfo={games}
        page={page}
        maxPage={pageLimit}
        setPage={setPage}
      />
    </div>
  );
};

export default Main;
