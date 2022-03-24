import React, { useEffect } from "react";
import Navbar from "./navbar";
import { apiCall } from "./helper";
import Games from "./games";
import { useCookies } from "react-cookie";
import Order from "./order";

const Store = ({ location }) => {
  const query = new URLSearchParams(location.search).get("query");
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageLimit, setLimit] = React.useState(0);
  const [cookie, setCookie] = useCookies(["token"]);
  const [order, setOrder] = React.useState("New Releases");
  const loadList = () => {
    apiCall(
      `/list?query=${
        query === null ? "" : query
      }&order=${order}&p=${page}&n=10`,
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
  }, [page, order]);

  return (
    <div>
      <Navbar part="Store" />
      <Order order={order} setOrder={setOrder} />
      <Games
        gamesInfo={games}
        page={page}
        maxPage={pageLimit}
        setPage={setPage}
      />
    </div>
  );
};

export default Store;
