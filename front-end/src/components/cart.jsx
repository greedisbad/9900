import React, { useEffect } from "react";
import Navbar from "./navbar";
import { apiCall, accAdd } from "./helper";
import { RemoveCircle, Delete, Check } from "@material-ui/icons";
import { useCookies } from "react-cookie";
import emptyCart from "./empty_cart.png";

const CartGame = ({ idx, gameInfo, selected, setSelect, remove }) => {
  const clickSelect = () => {
    let newSelected = [...selected];
    newSelected[idx] = !newSelected[idx];
    setSelect(newSelected);
  };
  return (
    <tr>
      <td onClick={clickSelect}>
        <input
          type="checkbox"
          checked={selected[idx] === undefined ? true : selected[idx]}
          onChange={clickSelect}
        />
      </td>
      <td>
        <a href={"/detail?id=" + gameInfo.id}>
          <img
            className="rounded"
            width="100"
            src={`data:image/jpeg;base64,${gameInfo.thumbnail}`}
          />
        </a>
      </td>
      <td className="text-center">{gameInfo.name}</td>
      <td className="text-center">{"$" + gameInfo.price}</td>
      <td>
        <button className="btn btn-sm" onClick={() => remove([gameInfo.id])}>
          <RemoveCircle style={{ color: "red" }} />
        </button>
      </td>
    </tr>
  );
};

const Cart = () => {
  const [games, setGames] = React.useState([]);
  const [selected, setSelect] = React.useState([]);
  const [cookie, setCookie] = useCookies(["token"]);
  const PopWnd = () => {
    return (
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Confirm Purchase
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {selected.some((x) => x) || "no item are selected"}
              {selected.some((x) => x) &&
                "$" +
                  games
                    .filter((_, i) => selected[i])
                    .reduce((a, b) => accAdd(a, b.price), 0)}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              {selected.some((x) => x) && (
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => pay(undefined)}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const loadList = () => {
    apiCall(
      `/user/cart`,
      {
        method: "GET",
        headers: {
          Authorization: cookie.token,
        },
      },
      (data) => {
        setGames(data["games"]);
        setSelect(new Array(data["games"].length).fill(false));
      },
      (err) => console.log(err)
    );
  };

  const selectAll = () => {
    if (selected.every((x) => x))
      setSelect(new Array(games.length).fill(false));
    else setSelect(new Array(games.length).fill(true));
  };

  const remove = (arr) => {
    if (arr === undefined)
      arr = games.filter((_, i) => selected[i]).map((game) => game.id);
    if (arr.length !== 0)
      apiCall(
        `/user/remove`,
        {
          method: "DELETE",
          headers: {
            Authorization: cookie.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ games: arr }),
        },
        (data) => loadList(),
        (err) => console.log(err)
      );
  };
  const pay = (arr) => {
    if (arr === undefined)
      arr = games.filter((_, i) => selected[i]).map((game) => game.id);
    if (arr.length !== 0)
      apiCall(
        `/user/pay`,
        {
          method: "POST",
          headers: {
            Authorization: cookie.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ games: arr }),
        },
        (data) => loadList(),
        (err) => console.log(err)
      );
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div>
      <Navbar part="Cart" />
      <div className="container mt-5 mb-5">
        <div className="contentbar">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className="card m-b-30">
                <div className="card-header">
                  <h5 className="card-title">Cart</h5>
                </div>
                {games.length === 0 && (
                  <img src={emptyCart} className="img-fluid pl-5 pr-5" />
                )}
                {games.length !== 0 && (
                  <div className="card-body">
                    <div className="justify-content-center table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Select</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {games.map((game, k) => (
                            <CartGame
                              key={k}
                              idx={k}
                              gameInfo={game}
                              selected={selected}
                              setSelect={setSelect}
                              remove={remove}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3">
                      <span onClick={selectAll}>
                        <input
                          type="checkbox"
                          className="m-3"
                          checked={selected.every((x) => x)}
                          onChange={selectAll}
                        />
                        {selected.every((x) => x)
                          ? "unselect all"
                          : "select all"}
                      </span>
                    </div>
                    <div>
                      <h4>
                        Total Price:{" "}
                        {games
                          .filter((_, i) => selected[i])
                          .reduce((a, b) => accAdd(a, b.price), 0)}
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-6 p-5">
                        <button
                          className="btn btn-xl btn-circle btn-danger"
                          onClick={() => remove(undefined)}
                        >
                          <Delete style={{ color: "white", fontSize: 40 }} />
                        </button>
                      </div>
                      <div className="col-6 p-5">
                        <button
                          className="btn btn-xl btn-circle btn-success"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          <Check style={{ color: "white", fontSize: 40 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopWnd />
    </div>
  );
};

export default Cart;
