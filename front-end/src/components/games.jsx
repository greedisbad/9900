import React, { Component, useState } from "react";
import { apiCall } from "./helper";
import Game from "./game";
import Pagination from "./pagination";

const Games = ({ gamesInfo, page, maxPage, setPage, decor }) => {
  return (
    <div>
      {gamesInfo.map((game, k) => (
        <Game key={k} gameInfo={game} decor={decor} />
      ))}
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};

export default Games;
