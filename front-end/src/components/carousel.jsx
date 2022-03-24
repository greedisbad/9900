import React from "react";

const Carousel = ({ pics }) => {
  return (
    <div className="container mt-3 mb-3">
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {pics.map((_, i) => {
            return (
              <li
                key={i}
                data-target="#carousel"
                data-slide-to={i}
                className={i === 0 ? "active" : ""}
              ></li>
            );
          })}
        </ol>
        <div className="carousel-inner">
          {pics.map((pic, i) => {
            return (
              <div
                key={i}
                className={"carousel-item" + (i === 0 ? " active" : "")}
              >
                <img
                  className="d-block w-100"
                  src={`data:image/jpeg;base64,${pic}`}
                />
              </div>
            );
          })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};
export default Carousel;
