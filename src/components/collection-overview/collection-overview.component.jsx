import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectShopItems } from "./../../redux/shop/shop.selector";
import "./collection-overview.styles.scss";
import CollectionPreview from "./../collection-preview/collection-preview.component";

const CollectionOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopItems,
});
export default connect(mapStateToProps)(CollectionOverview);
