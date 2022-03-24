import React from "react";

const Order = ({ order, setOrder }) => {
  return (
    <div className="container mt-3 mb-3">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 shadow-lg">
          <div className="row p-3 bg-grad text-light">
            <select
              value={order}
              onChange={(e) => {
                setOrder(e.target.value);
              }}
              className="form-select btn btn-info shadow"
            >
              <option value="New Releases">New Releases</option>
              <option value="Trending">Trending</option>
              <option value="Top Sellers">Top Sellers</option>
              <option value="Recommendation">Recommendation</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
