import React, { useEffect } from "react";
import Navbar from "./navbar";
import { apiCall } from "./helper";
import Games from "./games";
import { useCookies } from "react-cookie";

const Crowdfunding = () => {
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageLimit, setLimit] = React.useState(0);
  const [cookie, setCookie] = useCookies(["token"]);

  const loadList = () => {
    apiCall(
      `/user/crowdfunding`,
      {
        method: "GET",
        headers: {
          Authorization: cookie.token,
        },
      },
      (data) => {
        setGames(data["games"]);
        setLimit(data["maxPage"]);
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
      <Navbar part="Crowdfunding" />
      <Games
        gamesInfo={games}
        page={page}
        maxPage={pageLimit}
        setPage={setPage}
        decor={"donate"}
      />
    </div>
  );
};

export default Crowdfunding;
