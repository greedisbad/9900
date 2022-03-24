import React from "react";

const Tags = ({ tags }) => {
  return (
    <div className="pt-2 text-left">
      {tags.map((tag, i) => {
        return (
          <span
            style={{ marginLeft: 2, marginRight: 2 }}
            className="badge badge-dark"
            key={i}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default Tags;
