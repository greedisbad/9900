import React from "react";

const Counter = ({ onDelete, onAdd, info }) => {
  var { id, value } = info;

  return (
    <div>
      <span className={getClass(value)}>{formatCount(value)}</span>
      <button onClick={() => onAdd(id)} className="btn btn-success m-1">
        +
      </button>
      <button onClick={() => onDelete(id)} className="btn btn-success m-1">
        -
      </button>
    </div>
  );
};
const formatCount = (value) => {
  return value === 0 ? "zero" : value;
};

const getClass = (value) => {
  return "badge m-1 bg-" + (value === 0 ? "warning" : "secondary");
};
export default Counter;
