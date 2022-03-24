import React, { Component, useEffect } from "react";
import { apiCall } from "./helper";
import Navbar from "./navbar";
import Carousel from "./carousel";
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
  AddShoppingCart,
  GetAppSharp,
  Edit as EditIcon,
} from "@material-ui/icons";
import Tags from "./tags";
import RadioGroupRating from "./rating";
import { useCookies } from "react-cookie";
import { width } from "@mui/system";

const Detail = ({ location }) => {
  const gid = new URLSearchParams(location.search).get("id");
  const [detail, setDetail] = React.useState({});
  const [ratingVal, setRating] = React.useState(3);
  const [cmtText, setCmtText] = React.useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const [ani, setAni] = React.useState(false);

  const loadDetail = () => {
    apiCall(
      `/user/detail?id=${gid}`,
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

  const ratingMap = [
    <SentimentVeryDissatisfied style={{ color: "#ff3e3e" }} fontSize="large" />,
    <SentimentDissatisfied style={{ color: "#fe643e" }} fontSize="large" />,
    <SentimentSatisfied style={{ color: "#fd8b3e " }} fontSize="large" />,
    <SentimentSatisfiedAlt style={{ color: "#fcb13e" }} fontSize="large" />,
    <SentimentVerySatisfied style={{ color: "#fbd83e" }} fontSize="large" />,
  ];

  const Comment = ({ comments }) => {
    return (
      <div className="container mt-3 mb-3 text-light">
        <div className="bg-grad text-left">
          <h3 className="pl-3">CUSTOMER REVIEWS</h3>
          {comments.map((comment, i) => (
            <div key={i} className="comment p-2">
              <div className="text-justify p-2 border border-dark rounded bg-grad">
                <h4>
                  {ratingMap[parseInt(comment.rating) - 1]}
                  {"   " + comment.username}
                </h4>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Recommend = ({ recs }) => {
    return (
      <div className="container mt-3 mb-3 text-light">
        <div className="bg-grad text-left">
          <h3 className="pl-3"> MORE LIKE THIS</h3>
          <div className="row">
            {recs.map((rec, i) => (
              <a key={i} className="col-md-3" href={"/detail?id=" + rec.id}>
                <img
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  className="img-responsive p-3"
                  src={`data:image/jpeg;base64,${rec.thumbnail}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const PopWnd = () => {
    const [donateVal, setDonate] = React.useState("");
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
                Please enter the donation amount
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
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  type="number"
                  value={donateVal}
                  className="form-control"
                  onChange={(e) => setDonate(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => donate(donateVal)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DetailBtn = () => {
    if (detail.owned === 1) return <GetAppSharp />;
    else if (detail.owned === 2) return <EditIcon />;
    else return <AddShoppingCart />;
  };

  const btnHandler = () => {
    setAni(true);
    if (detail.owned === 1) console.log("download", detail.id);
    else if (detail.owned === 2) window.location.href = "/edit?id=" + detail.id;
    else if (cookie.token === "") {
      alert("please login");
      window.location.href = "/login";
    } else
      apiCall(
        `/user/add?id=${gid}`,
        {
          method: "POST",
          headers: {
            Authorization: cookie.token,
          },
        },
        (data) => {
          console.log("add to cart");
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const sendCmt = () => {
    apiCall(
      `/user/comment?id=${gid}`,
      {
        method: "POST",
        headers: {
          Authorization: cookie.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: ratingVal, content: cmtText }),
      },
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    setTimeout(() => {
      setRating(3);
      setCmtText("");
      loadDetail();
    }, 1000);
  };

  const donate = (val) => {
    apiCall(
      `/user/donate?id=${gid}`,
      {
        method: "POST",
        headers: {
          Authorization: cookie.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: val }),
      },
      (data) => {
        console.log(data);
        loadDetail();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    loadDetail();
    // console.log(detail);
  }, []);

  return (
    <div>
      <Navbar />

      {Object.keys(detail).length !== 0 && (
        <React.Fragment>
          <div className="container mt-3">
            <div className="bg-grad text-light p-3">
              <div className="row featurette ">
                <div className="col-md-7 order-md-2 text-left">
                  <h2 className="featurette-heading">
                    <span>{detail.name}</span>
                    <div className="float-right">
                      {(detail.status === 0 ? "received: $" : "$") +
                        detail.price +
                        " "}
                      {detail.status !== 0 && (
                        <button
                          className={"btn btn-primary" + (ani ? " ani" : "")}
                          onClick={btnHandler}
                          onAnimationEnd={() => setAni(false)}
                        >
                          <DetailBtn />
                        </button>
                      )}
                      {detail.status === 0 && (
                        <React.Fragment>
                          <PopWnd />
                          <button
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          >
                            donate
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  </h2>
                  <p>{detail.description}</p>
                </div>
                <div className="col-md-5 order-md-1">
                  <img
                    className="featurette-image img-fluid mx-auto"
                    src={`data:image/jpeg;base64,${detail.thumbnail}`}
                  />
                </div>
              </div>
              <Tags tags={detail.tags} />
            </div>
          </div>

          <Carousel pics={detail.pics} />

          {detail.recommends.length !== 0 && (
            <Recommend recs={detail.recommends} />
          )}

          {detail.comments.length !== 0 && (
            <Comment comments={detail.comments} />
          )}

          {detail.owned === 1 && (
            <div className="container mt-3 mb-3 text-light">
              <div className="card bg-grad">
                <div className="card-body p-4">
                  <h5>Add your comment</h5>
                  <RadioGroupRating
                    value={ratingVal}
                    setValue={(num) => setRating(parseInt(num))}
                  />
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Add your comment here"
                      value={cmtText}
                      onChange={(e) => setCmtText(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary mt-3 float-right"
                    onClick={sendCmt}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Detail;
