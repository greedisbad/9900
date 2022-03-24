import React, { Component, useEffect } from "react";
import { apiCall } from "./helper";
import Navbar from "./navbar";
import { Delete } from "@material-ui/icons";
import { useCookies } from "react-cookie";

const Edit = ({ location }) => {
  const [detail, setDetail] = React.useState({});
  const [cookie, setCookie] = useCookies(["token"]);
  const gid = new URLSearchParams(location.search).get("id");

  const PopWnd = () => {
    return (
      <div
        className="modal fade text-dark"
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
                Save
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
            <div className="modal-body">Saved successfully</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const loadDetail = () => {
    apiCall(
      `/admin/edit?id=${gid}`,
      {
        method: "GET",
        headers: {
          Authorization: cookie.token,
        },
      },
      (data) => {
        setDetail(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const updateDetail = (key, val, idx = undefined) => {
    let newDetail = { ...detail };
    if (key === "tags") newDetail[key][idx] = val;
    else newDetail[key] = val;
    setDetail(newDetail);
  };

  const modTag = (cmd, idx = undefined) => {
    let newDetail = { ...detail };
    if (cmd === "add") newDetail.tags.push("");
    else newDetail.tags = newDetail.tags.filter((_, i) => idx !== i);
    setDetail(newDetail);
  };

  const modPic = (cmd, idx = undefined, val = undefined) => {
    let newDetail = { ...detail };
    if (cmd === "add")
      newDetail.pics.push(
        "iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mP8X8+AFzCOKgADAJ1vDXivFXd/AAAAAElFTkSuQmCC"
      );
    else if (cmd === "rm")
      newDetail.pics = newDetail.pics.filter((_, i) => idx !== i);
    else {
      if (val.files) {
        const reader = new FileReader();
        reader.readAsDataURL(val.files[0]);
        reader.addEventListener(
          "load",
          () => {
            if (idx === undefined)
              newDetail.thumbnail = reader.result.split(",")[1];
            else newDetail.pics[idx] = reader.result.split(",")[1];
            setDetail(newDetail);
          },
          false
        );
      }
      return;
    }
    setDetail(newDetail);
  };

  const save = () => {
    apiCall(
      `/admin/save?id=${gid}`,
      {
        method: "PUT",
        headers: {
          Authorization: cookie.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      },
      (data) => {
        loadDetail();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    loadDetail();
  }, []);

  return (
    <div>
      <Navbar />

      {Object.keys(detail).length !== 0 && (
        <React.Fragment>
          <div className="container mt-3">
            <div className="bg-grad text-light p-3">
              <div className="row featurette ">
                <div className="col-md-5 order-md-1">
                  <input
                    type="file"
                    id="thumbnail"
                    style={{ display: "none" }}
                    onChange={(e) => modPic("change", undefined, e.target)}
                  />
                  <label className="btn" htmlFor="thumbnail">
                    <img
                      className="featurette-image img-fluid mx-auto"
                      src={`data:image/jpeg;base64,${detail.thumbnail}`}
                    />
                  </label>
                  <div className="row p-2">
                    <label className="col-2 col-form-label">{"Price:"}</label>
                    <input
                      className="form-control col-9"
                      placeholder="Price"
                      value={detail.price}
                      onChange={(e) => updateDetail("price", e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-7 order-md-2 text-left">
                  <h2 className="featurette-heading">
                    <span>
                      <input
                        className="form-control"
                        placeholder="Name"
                        value={detail.name}
                        onChange={(e) => updateDetail("name", e.target.value)}
                      />
                    </span>
                  </h2>
                  <p>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={detail.description}
                      placeholder="Description"
                      onChange={(e) =>
                        updateDetail("description", e.target.value)
                      }
                    />
                  </p>
                  <label>status: </label>
                  <select
                    value={detail.status}
                    onChange={(e) => updateDetail("status", e.target.value)}
                    className="form-select"
                  >
                    <option value={0}>crowdfunding</option>
                    <option value={1}>release</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 text-left flex">
                <div className="text-left">Tags</div>
                {detail.tags.map((tag, i) => {
                  return (
                    <span key={i}>
                      <input
                        placeholder={"tag " + (i + 1)}
                        value={tag}
                        onChange={(e) =>
                          updateDetail("tags", e.target.value, i)
                        }
                      />
                      <button onClick={() => modTag("rm", i)}>-</button>
                    </span>
                  );
                })}
                <button onClick={() => modTag("add")}> + </button>
              </div>
              <div className="mt-4">
                <div className="text-left">Pictures</div>
                <div style={{ display: "flex", flexFlow: "row wrap" }}>
                  {detail.pics.map((pic, i) => {
                    return (
                      <React.Fragment key={i}>
                        <div className="" style={{ flex: "0 0 50%" }}>
                          <div style={{ height: "100%" }}>
                            <input
                              type="file"
                              id={"pic" + i}
                              style={{ display: "none" }}
                              onChange={(e) => modPic("change", i, e.target)}
                            />
                            <label
                              className="btn"
                              style={{ width: "80%" }}
                              htmlFor={"pic" + i}
                            >
                              <img
                                style={{ width: "100%" }}
                                className="rounded"
                                src={`data:image/jpeg;base64,${pic}`}
                              />
                            </label>
                            <button
                              onClick={() => modPic("rm", i)}
                              className="btn btn-sm btn-danger"
                              style={{ width: "20%", height: "85%" }}
                            >
                              <Delete />
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
                <button
                  className="rounded btn btn-primary mt-2 col-5"
                  onClick={() => modPic("add")}
                >
                  +
                </button>
              </div>
              <div className="mt-3">
                <button
                  className="rounded btn btn-primary m-2"
                  onClick={() => window.location.reload(false)}
                >
                  RESET
                </button>
                <button
                  className="rounded btn btn-primary m-2"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                  onClick={save}
                >
                  SAVE
                </button>
                <PopWnd />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Edit;
