import React, { useEffect } from "react";
import Navbar from "./navbar";
import { apiCall } from "./helper";
import Games from "./games";
import { useCookies } from "react-cookie";

const Shelf = () => {
  const [games, setGames] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageLimit, setLimit] = React.useState(0);
  const [cookie, setCookie] = useCookies(["token"]);

  const loadList = () => {
    apiCall(
      `/admin/shelf?p=${page}&n=10`,
      {
        method: "GET",
        headers: {
          Authorization: cookie.token,
        },
      },
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

  const addGame = () => {
    apiCall(
      `/admin/add`,
      {
        method: "POST",
        headers: {
          Authorization: cookie.token,
        },
      },
      (data) => {
        loadList();
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
      <Navbar part="Shelf" />
      <div className="container mt-3 mb-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 shadow-lg">
            <div className="row p-3 bg-grad-2 text-light" onClick={addGame}>
              <button
                style={{ borderStyle: "dashed", borderColor: "antiquewhite" }}
                className="p-4 btn text-light col-12"
              >
                Add New Game
              </button>
            </div>
          </div>
        </div>
      </div>
      <Games
        gamesInfo={games}
        page={page}
        maxPage={pageLimit}
        setPage={setPage}
        decor={"edit"}
      />
    </div>
  );
};

export default Shelf;
