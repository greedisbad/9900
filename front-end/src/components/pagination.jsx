import React, { Component, useEffect } from "react";
import Navbar from "./navbar";

const Pagination = ({ page, maxPage, setPage }) => {
  const pageArr = () => {
    let arr = [];
    if (maxPage < 5) return [...Array(maxPage)].map((_, i) => i + 1);

    for (var i = 0; i < 4; i++) {
      if (page + i < maxPage) arr.push(page + i + 1);
    }
    if (page + 5 < maxPage) arr.push("...");
    if (page + 4 < maxPage) arr.push(maxPage);
    if (page > 1) arr.unshift("...");
    if (page > 0) arr.unshift(1);
    return arr;
  };

  const [pages, setPages] = React.useState([]);
  useEffect(() => {
    setPages(pageArr());
  }, [page, maxPage]);

  return (
    <div>
      {maxPage != 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={"page-item" + (page > 0 ? "" : " disabled")}>
              <a
                className="page-link"
                onClick={() => {
                  if (page > 0) setPage(page - 1);
                }}
              >
                {"<"}
              </a>
            </li>

            {pages.map((num, i) => {
              return (
                <li
                  key={i}
                  className={"page-item" + (page + 1 == num ? " active" : "")}
                >
                  <a
                    className="page-link"
                    onClick={() => {
                      if (num != "...") setPage(num - 1);
                    }}
                  >
                    {num}
                  </a>
                </li>
              );
            })}
            <li
              className={"page-item" + (page < maxPage - 1 ? "" : " disabled")}
            >
              <a
                className="page-link"
                onClick={() => {
                  if (page < maxPage - 1) setPage(page + 1);
                }}
              >
                {">"}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Pagination;
