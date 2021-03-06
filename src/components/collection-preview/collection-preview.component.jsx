import React from "react";
import { Link } from "react-router-dom";
import "./collection-preview.style.scss";
import CollectionItem from "../collection-item/collection-item.component";

const CollectionPreview = ({ title, items }) => {
  return (
    <div className="collection-preview">
      <Link
        to={`/shop/${title.toLowerCase()}`}
        className="collection-preview__link"
      >
        {title.toUpperCase()}
      </Link>
      <div className="preview">
        {items
          .filter((item, index) => index < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
