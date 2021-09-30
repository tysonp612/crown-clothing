import React from "react";
import "./menu-item.styles.scss";
import { withRouter } from "react-router-dom";
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <div
      className={size ? "large menu-item" : "menu-item"}
      onClick={() => history.push(`${match.url}${linkUrl}`)} // /somematchedURL/linkURL
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="suntitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
